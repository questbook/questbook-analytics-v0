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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const syncWorkspacesTable_1 = require("./src/syncWorkspacesTable");
const syncGrantsTable_1 = require("./src/syncGrantsTable");
const syncApplicationsTable_1 = require("./src/syncApplicationsTable");
const syncFundingTable_1 = require("./src/syncFundingTable");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
let syncTableInterval;
let sql;
const setupSql = () => __awaiter(void 0, void 0, void 0, function* () {
    const mysqlConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    };
    sql = yield promise_1.default.createConnection(mysqlConfig);
});
setupSql();
const syncTable = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!sql) {
        yield setupSql();
    }
    return setInterval(() => {
        console.log('started sync', Date.now());
        // TODO
        // This will fail if syncTable takes longer than the interval
        // Keeping a large interval size for now
        (0, syncWorkspacesTable_1.syncWorkspacesTable)(sql);
        (0, syncGrantsTable_1.syncGrantsTable)(sql);
        (0, syncApplicationsTable_1.syncGrantApplicationsTable)(sql);
        (0, syncFundingTable_1.syncFundingTable)(sql);
    }, 10 * 1000);
});
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World');
//   sql.query('select * from chains', (err, results, fields) => {
//     console.log(err, results, fields);
//   });
// });
app.get('/workspaces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!sql) {
        res.send('Connecting to DB');
    }
    // const data = await Promise.all(tables.map(async (table) => {
    //   const result = await syncTable(sql!, table)
    //   return result
    // }))
    res.send('no');
    // const result = await syncTable(sql!, tables[0]) as {chainId: number, skip: number}[]
    // const allWorkspaces = await Promise.all(result.map(async (element) => {
    //   const workspaces = await getAllWorkspacesForChain(element.chainId, element.skip)
    //   // console.log(element.chainId, workspaces.length)
    //   return workspaces;
    // }));
    // res.send(allWorkspaces)
}));
app.post('/reset-tables', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    if (password !== 'gocashless') {
        res.send('unauthorized');
        return;
    }
    if (syncTableInterval) {
        clearInterval(syncTableInterval);
    }
    const resetQuery = [
        "delete from grants where true",
        "delete from workspaces where true",
        "delete from grantApplications where true",
        "delete from funding where true",
        "update syncedTill set skip = 0 where true"
    ];
    yield Promise.all(resetQuery.map((query) => sql.execute(query)));
    console.log('starting syncing');
    syncTableInterval = yield syncTable();
    res.send('ok');
}));
app.post('/start-syncing', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (syncTableInterval) {
        clearInterval(syncTableInterval);
    }
    syncTableInterval = yield syncTable();
    res.send('ok');
}));
app.post('/workspace-analytics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const chainId = req.body.chainId;
    const workspaceId = req.body.workspaceId;
    const totalApplicantsQuery = `select count(applicantAddress) as res from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\')`;
    const [totalApplicantsRow, _] = yield sql.execute(totalApplicantsQuery);
    const totalApplicants = totalApplicantsRow[0]['res'];
    console.log(totalApplicants);
    const uniqueApplicantsQuery = `select count(*) as res from (select applicantAddress, count(*) from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} group by applicantAddress) as applicants`;
    const [uniqueApplicantsRow, __] = yield sql.execute(uniqueApplicantsQuery);
    const uniqueApplicants = uniqueApplicantsRow[0]['res'];
    console.log(uniqueApplicants);
    const repeatApplicantsQuery = `select count(*) as res from (select applicantAddress, count(*) from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} group by applicantAddress having count(*) > 1) as applicants`;
    const [repeatApplicantsRow, ___] = yield sql.execute(repeatApplicantsQuery);
    const repeatApplicants = repeatApplicantsRow[0]['res'];
    console.log(repeatApplicants);
    const everydayApplicationsQuery = `select DATE(createdAt) as fordate, count(*) as numApps from (select * from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId}) as grantApplicationsForWorkspace group by DATE(createdAt) order by fordate`;
    const [everydayApplicationsRow, ____] = yield sql.execute(everydayApplicationsQuery);
    const everydayApplications = everydayApplicationsRow;
    console.log(everydayApplications);
    const everydayFundingQuery = `select DATE(time) as fordate, sum(amount) as sumFund from (select * from funding where applicationId in (select applicationId from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} ) && chainId = ${chainId}) as fundingForWorkspace group by DATE(time) order by fordate;`;
    const [everydayFundingRow, _____] = yield sql.execute(everydayFundingQuery);
    const everydayFunding = everydayFundingRow;
    res.json({
        totalApplicants: totalApplicants,
        uniqueApplicants: uniqueApplicants,
        repeatApplicants: repeatApplicants,
        everydayApplications: everydayApplications,
        everyFunding: everydayFunding,
    });
}));
app.listen(port, () => {
    console.log('server started', port);
});
