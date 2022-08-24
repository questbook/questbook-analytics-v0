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
exports.syncGrantsTable = void 0;
const axios_1 = __importDefault(require("axios"));
const tables_1 = require("./tables");
const subgraphEndpoints_1 = require("./subgraphEndpoints");
const tables = tables_1.TABLES;
const endpoints = subgraphEndpoints_1.SUBGRAPH_ENDPOINTS;
const syncGrantsTable = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const table = tables['grants'];
    const defaultSkip = yield getUpdatedTillRows(sql, table.tableName);
    // console.log(defaultSkip)
    const allGrants = yield Promise.all(defaultSkip.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const grants = yield getNewGrantsForChainFromSubgraph(element.chainId, element.skip);
        // console.log(element.chainId, grants.length)
        if (grants.length > 0) {
            yield insertNewGrants(sql, element.chainId, grants);
        }
        return grants;
    })));
    return allGrants;
});
exports.syncGrantsTable = syncGrantsTable;
const getUpdatedTillRows = (sqlConnection, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
    const [rows, fields] = yield sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`);
    return rows;
});
const getNewGrantsForChainFromSubgraph = (chainId, defaultSkip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let first = 100;
    let skip = defaultSkip;
    let grants = [];
    const endpoint = (_a = endpoints.find((endpoint) => endpoint.chainId == chainId)) === null || _a === void 0 ? void 0 : _a.endpoint;
    if (!endpoint)
        return [];
    while (true) {
        let body = {
            query: tables['grants'].query,
            variables: {
                first,
                skip
            }
        };
        try {
            const result = yield axios_1.default.post(endpoint, body);
            if (((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.grants) && result.data.data.grants.length > 0) {
                grants = [...grants, ...result.data.data.grants];
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
    // console.log(grants[0]?.workspace?.id)
    return grants;
});
const insertNewGrants = (sql, chainId, grants) => __awaiter(void 0, void 0, void 0, function* () {
    const insertString = grants.map((grant) => `('${grant.id}', '${grant.title.replace("'", "''")}', '${grant.workspace.id}', ${chainId})`);
    // console.log(insertString.join(','))
    const [rows, fields] = yield sql.execute(`insert into grants (grantId, title, workspaceId, chainId) values ${insertString}`);
    // console.log('chain updated', chainId, rows)
    const [updatedRows, updatedFields] = yield sql.execute(`update syncedTill set skip = skip + ${grants.length} where chainId=${chainId} && tableName='${tables['grants'].tableName}'`);
    return true;
});
