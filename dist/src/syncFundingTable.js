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
exports.syncFundingTable = void 0;
const axios_1 = __importDefault(require("axios"));
const tables_1 = require("./tables");
const subgraphEndpoints_1 = require("./subgraphEndpoints");
const tables = tables_1.TABLES;
const endpoints = subgraphEndpoints_1.SUBGRAPH_ENDPOINTS;
const syncFundingTable = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const table = tables['funding'];
    const defaultSkip = yield getUpdatedTillRows(sql, table.tableName);
    // console.log(defaultSkip)
    const allFunding = yield Promise.all(defaultSkip.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const funding = yield getNewFundingForChainFromSubgraph(element.chainId, element.skip);
        // console.log(element.chainId, grants.length)
        if (funding.length > 0) {
            yield insertNewFunding(sql, element.chainId, funding);
        }
        return funding;
    })));
    return allFunding;
});
exports.syncFundingTable = syncFundingTable;
const getUpdatedTillRows = (sqlConnection, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
    const [rows, fields] = yield sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`);
    return rows;
});
const getNewFundingForChainFromSubgraph = (chainId, defaultSkip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let first = 100;
    let skip = defaultSkip;
    let grants = [];
    const endpoint = (_a = endpoints.find((endpoint) => endpoint.chainId == chainId)) === null || _a === void 0 ? void 0 : _a.endpoint;
    if (!endpoint)
        return [];
    while (true) {
        let body = {
            query: tables['funding'].query,
            variables: {
                first,
                skip
            }
        };
        try {
            const result = yield axios_1.default.post(endpoint, body);
            if (((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.fundsTransfers) && result.data.data.fundsTransfers.length > 0) {
                grants = [...grants, ...result.data.data.fundsTransfers];
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
    // console.log(grants[0].workspace.id)
    return grants;
});
const insertNewFunding = (sql, chainId, funds) => __awaiter(void 0, void 0, void 0, function* () {
    const insertString = funds.map((fund) => {
        const createdAt = new Date(fund.createdAtS * 1000).toISOString().slice(0, 19).replace('T', ' ');
        // Storing fund amount / 10**6
        const amount = (BigInt(fund.amount) / BigInt(10 ** 6)).toString();
        return `('${fund.id}', '${fund.application.id}', ${amount}, '${fund.grant.reward.asset}', '${createdAt}', ${chainId})`;
    });
    // console.log(insertString.join(','))
    const [rows, fields] = yield sql.execute(`insert into funding (fundingId, applicationId, amount, asset, time, chainId) values ${insertString}`);
    // console.log('chain updated', chainId, rows)
    const [updatedRows, updatedFields] = yield sql.execute(`update syncedTill set skip = skip + ${funds.length} where chainId=${chainId} && tableName='${tables['funding'].tableName}'`);
    return true;
});
