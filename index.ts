import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import axios from 'axios';
import { TABLES } from './src/tables';
import { syncWorkspacesTable } from './src/syncWorkspacesTable';
import { SUBGRAPH_ENDPOINTS } from './src/subgraphEndpoints';
import { syncGrantsTable } from './src/syncGrantsTable';
import { syncGrantApplicationsTable } from './src/syncApplicationsTable';
import { syncFundingTable } from './src/syncFundingTable';

dotenv.config();

const app: Express = express();
app.use(express.json())
const port = process.env.PORT;
let syncTableInterval: NodeJS.Timer;


let sql: undefined | mysql.Connection;
const setupSql = async () => {
  const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  };
  sql = await mysql.createConnection(mysqlConfig);
}

setupSql()

const syncTable =  async () => {
  if (!sql) {
    await setupSql();
  }
  return setInterval(() => {
    console.log('started sync', Date.now())

    // TODO
    // This will fail if syncTable takes longer than the interval
    // Keeping a large interval size for now
    syncWorkspacesTable(sql!)
    syncGrantsTable(sql!)
    syncGrantApplicationsTable(sql!)
    syncFundingTable(sql!)
  }, 10*1000)
}

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World');
//   sql.query('select * from chains', (err, results, fields) => {
//     console.log(err, results, fields);
//   });
// });

app.get('/workspaces', async (req: Request, res: Response) => {
  if (!sql) {
    res.send('Connecting to DB')
  }
  // const data = await Promise.all(tables.map(async (table) => {
  //   const result = await syncTable(sql!, table)
  //   return result
  // }))

  res.send('no')

  // const result = await syncTable(sql!, tables[0]) as {chainId: number, skip: number}[]
  // const allWorkspaces = await Promise.all(result.map(async (element) => {
  //   const workspaces = await getAllWorkspacesForChain(element.chainId, element.skip)
  //   // console.log(element.chainId, workspaces.length)
  //   return workspaces;
  // }));
  // res.send(allWorkspaces)
});

app.post('/reset-tables', async(req: Request, res: Response) => {
  const password = req.body.password;
  if (password !== 'gocashless') {
    res.send('unauthorized')
    return
  }

  if (syncTableInterval) {
    clearInterval(syncTableInterval)
  }

  const resetQuery = [
    "delete from grants where true",
    "delete from workspaces where true",
    "delete from grantApplications where true",
    "delete from funding where true",
    "update syncedTill set skip = 0 where true"
  ];

  await Promise.all(resetQuery.map((query) => sql!.execute(query)))
  
  console.log('starting syncing')
  syncTableInterval = await syncTable()

  res.send('ok')
})

app.post('/start-syncing', async(req: Request, res: Response) => {
  if (syncTableInterval) {
    clearInterval(syncTableInterval)
  }

  syncTableInterval = await syncTable()
  res.send('ok')
})

app.post('/workspace-analytics',async (req: Request, res: Response) => {
  console.log(req.body)

  const chainId = req.body.chainId;
  const workspaceId = req.body.workspaceId;

  const totalApplicantsQuery = 
    `select count(applicantAddress) as res from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\')`
  ;
  const [totalApplicantsRow, _] = await sql!.execute(totalApplicantsQuery)
  const totalApplicants = (totalApplicantsRow as any[])[0]['res']

  console.log(totalApplicants)

  const uniqueApplicantsQuery = 
    `select count(*) as res from (select applicantAddress, count(*) from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} group by applicantAddress) as applicants`
  ;
  const [uniqueApplicantsRow, __] = await sql!.execute(uniqueApplicantsQuery)
  const uniqueApplicants = (uniqueApplicantsRow as any[])[0]['res']

  console.log(uniqueApplicants)

  const repeatApplicantsQuery = 
    `select count(*) as res from (select applicantAddress, count(*) from grantApplications where grantId in (select grantId from grants where chainId = ${chainId} && workspaceId = \'${workspaceId}\') && chainId = ${chainId} group by applicantAddress having count(*) > 1) as applicants;`
  ;
  const [repeatApplicantsRow, ___] = await sql!.execute(repeatApplicantsQuery)
  const repeatApplicants = (repeatApplicantsRow as any[])[0]['res']

  console.log(repeatApplicants)

  const 

  res.json({
    totalApplicants: totalApplicants,
    uniqueApplicants: uniqueApplicants,
    repeatApplicants: repeatApplicants,
  })
})

app.listen(port, () => {
  console.log('server started', port);
});
