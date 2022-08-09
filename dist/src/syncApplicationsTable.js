"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncGrantApplicationsTable = void 0;
const axios_1 = __importDefault(require("axios"));
const tables_1 = require("./tables");
const subgraphEndpoints_1 = require("./subgraphEndpoints");
const tables = tables_1.TABLES;
const endpoints = subgraphEndpoints_1.SUBGRAPH_ENDPOINTS;
const syncGrantApplicationsTable = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const table = tables['grantApplications'];
    const defaultSkip = yield getUpdatedTillRows(sql, table.tableName);
    // console.log('defaultSkip', defaultSkip)
    const allGrantApplications = yield Promise.all(defaultSkip.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const grantApplications = yield getNewGrantApplicationsForChainFromSubgraph(element.chainId, element.skip);
        // console.log(element.chainId, grantApplications.length)
        if (grantApplications.length > 0) {
            yield insertNewGrantApplications(sql, element.chainId, grantApplications);
        }
        return grantApplications;
    })));
    return allGrantApplications;
});
exports.syncGrantApplicationsTable = syncGrantApplicationsTable;
const getUpdatedTillRows = (sqlConnection, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
    const [rows, fields] = yield sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`);
    return rows;
});
const getNewGrantApplicationsForChainFromSubgraph = (chainId, defaultSkip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let first = 100;
    let skip = defaultSkip;
    let grantApplications = [];
    const endpoint = (_a = endpoints.find((endpoint) => endpoint.chainId == chainId)) === null || _a === void 0 ? void 0 : _a.endpoint;
    if (!endpoint)
        return [];
    while (true) {
        let body = {
            query: tables['grantApplications'].query,
            variables: {
                first,
                skip
            }
        };
        // console.log('running q', body)
        try {
            const result = yield axios_1.default.post(endpoint, body);
            if (((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.grantApplications) && result.data.data.grantApplications.length > 0) {
                grantApplications = [...grantApplications, ...result.data.data.grantApplications];
                skip += first;
            }
            else {
                break;
            }
        }
        catch (e) {
            break;
        }
    }
    //console.log('rec',grantApplications)
    return grantApplications;
});
const insertNewGrantApplications = (sql, chainId, grantApplications) => __awaiter(void 0, void 0, void 0, function* () {
    const insertString = grantApplications.map((grantApplication) => {
        const createdAt = new Date(grantApplication.createdAtS * 1000).toISOString().slice(0, 19).replace('T', ' ');
        const updatedAt = new Date(grantApplication.updatedAtS * 1000).toISOString().slice(0, 19).replace('T', ' ');
        // console.log(grantApplication)
        return `('${grantApplication.id}', '${grantApplication.applicantId}', '${createdAt}', '${updatedAt}', ${grantApplication.state === 'approved' ? 1 : 0}, '${grantApplication.grant.id}', ${chainId}, ${grantApplication.state === 'submitted' ? 1 : 0})`;
    });
    // console.log(insertString.join(','))
    const [rows, fields] = yield sql.execute(`insert into grantApplications (applicationId, applicantAddress, createdAt, updatedAt, isAccepted, grantId, chainId, isPending) values ${insertString}`);
    // console.log('chain updated', chainId, rows)
    const [updatedRows, updatedFields] = yield sql.execute(`update syncedTill set skip = skip + ${grantApplications.length} where chainId=${chainId} && tableName='${tables['grantApplications'].tableName}'`);
    // console.log('updated syncedtill for grantApplications',updatedRows)
    return true;
});
