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
    // syncTableInterval = await syncTable();
    resetTable();
});
setupSql();
const resetTable = () => __awaiter(void 0, void 0, void 0, function* () {
    if (syncTableInterval) {
        clearInterval(syncTableInterval);
    }
    const resetQuery = [
        'delete from grants where true',
        'delete from workspaces where true',
        'delete from grantApplications where true',
        'delete from funding where true',
        'update syncedTill set skip = 0 where true',
    ];
    yield Promise.all(resetQuery.map((query) => sql.execute(query)));
    console.log('starting syncing');
    syncTableInterval = yield syncTable();
    setTimeout(() => resetTable(), 10 * 60 * 1000);
});
const syncTable = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!sql) {
        yield setupSql();
    }
    (0, syncWorkspacesTable_1.syncWorkspacesTable)(sql);
    (0, syncGrantsTable_1.syncGrantsTable)(sql);
    (0, syncApplicationsTable_1.syncGrantApplicationsTable)(sql);
    (0, syncFundingTable_1.syncFundingTable)(sql);
    return setInterval(() => {
        console.log('started sync', Date.now());
        // TODO
        // This will fail if syncTable takes longer than the interval
        // Keeping a large interval size for now
        (0, syncWorkspacesTable_1.syncWorkspacesTable)(sql);
        (0, syncGrantsTable_1.syncGrantsTable)(sql);
        (0, syncApplicationsTable_1.syncGrantApplicationsTable)(sql);
        (0, syncFundingTable_1.syncFundingTable)(sql);
    }, 1 * 60 * 1000);
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
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
    // TODO password is in plaintext?!?
    if (password !== 'gocashless') {
        res.send('unauthorized');
        return;
    }
    if (syncTableInterval) {
        clearInterval(syncTableInterval);
    }
    const resetQuery = [
        'delete from grants where true',
        'delete from workspaces where true',
        'delete from grantApplications where true',
        'delete from funding where true',
        'update syncedTill set skip = 0 where true',
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
    const totalApplicantsQuery = `select count(applicantAddress) as res from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId}`;
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
    const winnerApplicantsQuery = `select count(*) as res from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId =  ${chainId} && isAccepted = 1;`;
    const [winnerApplicantsRow, ____] = yield sql.execute(winnerApplicantsQuery);
    const winnerApplicants = winnerApplicantsRow[0]['res'];
    // console.log(repeatApplicants)
    const everydayApplicationsQuery = `select DATE(createdAt) as fordate, count(*) as numApps from (select * from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId}) as grantApplicationsForWorkspace group by DATE(createdAt) order by fordate`;
    const [everydayApplicationsRow, _____] = yield sql.execute(everydayApplicationsQuery);
    const everydayApplications = everydayApplicationsRow;
    console.log(everydayApplications);
    const everydayFundingQuery = `select fordate, sum(ss) as funding from (select fordate, e.asset, sumFund*conversionRate as ss from (select DATE(time) as fordate, asset, sum(amount) as sumFund from (select * from funding where applicationId in (select applicationId from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} ) && chainId = ${chainId}) as fundingWorkspace group by asset, DATE(time) order by fordate) as e join conversions c on e.asset=c.asset) as re group by fordate;`;
    const [everydayFundingRow, ______] = yield sql.execute(everydayFundingQuery);
    const everydayFunding = everydayFundingRow;
    // console.log(everydayFunding)
    const grantsFundingQuery = `select grantId, sum(amount*conversionRate) as funding from (select grantId, amount, asset from (select applicationId, w.grantId from grantApplications g join (select grantId, chainId from grants where chainId=${chainId} && workspaceId=\'${workspaceId}\') as w on g.grantId=w.grantId && g.chainId=w.chainId) as j join (select amount, asset, applicationId from funding where chainId=${chainId}) as f on j.applicationId=f.applicationId) as f join conversions c on f.asset=c.asset group by grantId; `;
    const [grantsFundingRow, _______] = yield sql.execute(grantsFundingQuery);
    const grantsFunding = grantsFundingRow;
    const grantsPendingQuery = `select count(isPending) as res, grantId from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId=\'${workspaceId}\') && isPending=1 && chainId = ${chainId} group by grantId;`;
    const [grantsPendingRow, ________] = yield sql.execute(grantsPendingQuery);
    const grantsPending = grantsPendingRow;
    const grantsTatQuery = `select avg(abs(res)) as res, grantId from (select grantId, applicationId, createdAt, updatedAt, abs(timestampdiff(MINUTE, createdAt, updatedAt)) as res  from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId=\'${workspaceId}\') &&  chainId = ${chainId} && timestampdiff(MINUTE, createdAt, updatedAt) != 0) as final group by grantId;`;
    const [grantsTatRow, _________] = yield sql.execute(grantsTatQuery);
    const grantsTat = grantsTatRow;
    const tatQuery = `select avg(res) as res from (select avg(timestampdiff(MINUTE, createdAt, time)) as res, grantId from (select min(time) as time, grantId, createdAt from (select grantId, g.applicationId, time, createdAt, fundingId , g.chainId from (select grantId, applicationId, createdAt, chainId from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId=\'${workspaceId}\') && chainId = ${chainId}) as g join (select time, fundingId, applicationId, chainId from funding) as f on g.applicationId=f.applicationId && g.chainId=f.chainId order by time asc) as m group by applicationId) as final group by grantId) as ff;`;
    const [tatRow, __________] = yield sql.execute(tatQuery);
    const tat = tatRow[0]['res'];
    res.json({
        totalApplicants: totalApplicants,
        uniqueApplicants: uniqueApplicants,
        repeatApplicants: repeatApplicants,
        winnerApplicants: winnerApplicants,
        everydayApplications: everydayApplications,
        everydayFunding: everydayFunding,
        grantsFunding: grantsFunding,
        grantsPending: grantsPending,
        grantsTat: grantsTat,
        tat: tat,
    });
}));
app.post('/analytics', (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fundingQuery = `select sum(amount), workspaceId, chainId, concat(workspaceId, '-', chainId) as groupkey from funding group by groupkey;`;
    const [fundingRow, _] = yield sql.execute(fundingQuery);
    const funding = fundingRow;
    const appQuery = `select count(*), workspaceId, chainId, concat(workspaceId, '-', chainId) as groupkey from grantApplications group by groupkey;`;
    const [appRow, __] = yield sql.execute(appQuery);
    const applications = appRow;
    console.log(funding);
    res.json({
        funding,
        applications
    });
}));
app.listen(port, () => {
    console.log('server started', port);
});
