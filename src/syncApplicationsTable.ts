import mysql from 'mysql2/promise';
import axios from 'axios';
import { TableData, TABLES } from './tables';
import { SUBGRAPH_ENDPOINTS } from './subgraphEndpoints';

const tables = TABLES
const endpoints = SUBGRAPH_ENDPOINTS

export const syncGrantApplicationsTable = async (sql: mysql.Connection) => {
  const table = tables['grantApplications']

  const defaultSkip = await getUpdatedTillRows(sql, table.tableName) as {chainId: number, skip: number}[]
  // console.log(defaultSkip)
  
  const allGrantApplications = await Promise.all(defaultSkip.map(async (element) => {
    const grantApplications = await getNewGrantApplicationsForChainFromSubgraph(element.chainId, element.skip)
    // console.log(element.chainId, grants.length)
    if (grantApplications.length > 0) {
      await insertNewGrantApplications(sql, element.chainId, grantApplications)
    }
    return grantApplications
  }))

  return allGrantApplications
}

const getUpdatedTillRows = async (sqlConnection: mysql.Connection, tableName: string) => {
  // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  const [rows, fields] = await sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  return rows
}

const getNewGrantApplicationsForChainFromSubgraph = async (chainId: number, defaultSkip = 0) => {
  let first = 100
  let skip = defaultSkip

  let grantApplications: any[] = []
  const endpoint = endpoints.find((endpoint) => endpoint.chainId == chainId)?.endpoint
  if (!endpoint) return []
  
  while (true) {
    let body = {
      query: tables['grantApplications'].query,
      variables: {
        first,
        skip
      }
    };
    try {
      const result = await axios.post(
        endpoint, 
        body
      )
      if (result.data?.data?.grantApplications && result.data.data.grantApplications.length > 0) {
        grantApplications = [...grantApplications, ...result.data.data.grantApplications]
        skip += first
      } else {
        break
      }
    } catch (e) {
      break
    }
  }

  // console.log(grantApplications)
  return grantApplications
}

const insertNewGrantApplications = async (sql: mysql.Connection, chainId: number, grantApplications: any[]) => {
  const insertString = grantApplications.map((grantApplication: any) => {
    const createdAt = new Date(grantApplication.createdAtS*1000).toISOString().slice(0, 19).replace('T', ' ')
    const updatedAt = new Date(grantApplication.updatedAtS*1000).toISOString().slice(0, 19).replace('T', ' ')
    // console.log(grantApplication)
    return `('${grantApplication.id}', '${grantApplication.applicantId}', '${createdAt}', '${updatedAt}', ${grantApplication.state === 'approved' ? 1 : 0}, '${grantApplication.grant.id}', ${chainId})`
  }
  )
  // console.log(insertString.join(','))
  const [rows, fields] = await sql.execute(`insert into grantApplications (applicationId, applicantAddress, createdAt, updatedAt, isAccepted, grantId, chainId) values ${insertString}`)
  // console.log('chain updated', chainId, rows)
  const [updatedRows, updatedFields] = await sql.execute(`update syncedTill set skip = skip + ${grantApplications.length} where chainId=${chainId} && tableName='${tables['grantApplications'].tableName}'`)
  return true
}