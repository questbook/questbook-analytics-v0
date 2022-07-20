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
exports.syncWorkspacesTable = void 0;
const axios_1 = __importDefault(require("axios"));
const tables_1 = require("./tables");
const subgraphEndpoints_1 = require("./subgraphEndpoints");
const tables = tables_1.TABLES;
const endpoints = subgraphEndpoints_1.SUBGRAPH_ENDPOINTS;
const syncWorkspacesTable = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const table = tables['workspaces'];
    const defaultSkip = yield getUpdatedTillRows(sql, table.tableName);
    // console.log(defaultSkip)
    const allWorkspaces = yield Promise.all(defaultSkip.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaces = yield getNewWorkspacesForChainFromSubgraph(element.chainId, element.skip);
        // console.log(element.chainId, workspaces.length)
        if (workspaces.length > 0) {
            yield insertNewWorkspaces(sql, element.chainId, workspaces);
        }
        return workspaces;
    })));
    return allWorkspaces;
});
exports.syncWorkspacesTable = syncWorkspacesTable;
const getUpdatedTillRows = (sqlConnection, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
    const [rows, fields] = yield sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`);
    return rows;
});
const getNewWorkspacesForChainFromSubgraph = (chainId, defaultSkip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let first = 100;
    let skip = defaultSkip;
    let workspaces = [];
    const endpoint = (_a = endpoints.find((endpoint) => endpoint.chainId == chainId)) === null || _a === void 0 ? void 0 : _a.endpoint;
    if (!endpoint)
        return [];
    while (true) {
        let body = {
            query: `
        query workspaces($first: Int!, $skip: Int!) {
          workspaces(
            subgraphError: allow,
            first: $first,
            skip: $skip,
          ) {
            id
            title
          }
        }
      `,
            variables: {
                first,
                skip
            }
        };
        const result = yield axios_1.default.post(endpoint, body);
        if (((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.workspaces) && result.data.data.workspaces.length > 0) {
            workspaces = [...workspaces, ...result.data.data.workspaces];
            skip += first;
        }
        else {
            break;
        }
    }
    return workspaces;
});
const insertNewWorkspaces = (sql, chainId, workspaces) => __awaiter(void 0, void 0, void 0, function* () {
    const insertString = workspaces.map((workspace) => `('${workspace.id}', '${workspace.title.replace("'", "''")}', ${chainId})`);
    // console.log(insertString.join(','))
    const [rows, fields] = yield sql.execute(`insert into workspaces (workspaceId, title, chainId) values ${insertString}`);
    // console.log('chain updated', chainId, rows)
    const [updatedRows, updatedFields] = yield sql.execute(`update syncedTill set skip = skip + ${workspaces.length} where chainId=${chainId} && tableName='${tables['workspaces'].tableName}'`);
    return true;
});
