import mysql from 'mysql2/promise';
import axios from 'axios';
import { TableData, TABLES } from './tables';
import { SUBGRAPH_ENDPOINTS } from './subgraphEndpoints';

const tables = TABLES
const endpoints = SUBGRAPH_ENDPOINTS

export const syncGrantsTable = async (sql: mysql.Connection) => {
  const table = tables['grants']

  const defaultSkip = await getUpdatedTillRows(sql, table.tableName) as {chainId: number, skip: number}[]
  // console.log(defaultSkip)
  
  const allGrants = await Promise.all(defaultSkip.map(async (element) => {
    const grants = await getNewGrantsForChainFromSubgraph(element.chainId, element.skip)
    // console.log(element.chainId, grants.length)
    if (grants.length > 0) {
      await insertNewGrants(sql, element.chainId, grants)
    }
    return grants
  }))

  return allGrants
}

const getUpdatedTillRows = async (sqlConnection: mysql.Connection, tableName: string) => {
  // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  const [rows, fields] = await sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  return rows
}

const getNewGrantsForChainFromSubgraph = async (chainId: number, defaultSkip = 0) => {
  let first = 100
  let skip = defaultSkip

  let grants: any[] = []
  const endpoint = endpoints.find((endpoint) => endpoint.chainId == chainId)?.endpoint
  if (!endpoint) return []
  
  while (true) {
    let body = {
      query: tables['grants'].query,
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
      if (result.data?.data?.grants && result.data.data.grants.length > 0) {
        grants = [...grants, ...result.data.data.grants]
        skip += first
      } else {
        break
      }
    } catch (e) {
      break
    }
  }

  // console.log(grants[0].workspace.id)
  return grants
}

const insertNewGrants = async (sql: mysql.Connection, chainId: number, grants: any[]) => {
  const insertString = grants.map((grant: any) => 
  `('${grant.id}', '${grant.title.replace("'", "''")}', '${grant.workspace.id}', ${chainId})`
  )
  // console.log(insertString.join(','))
  const [rows, fields] = await sql.execute(`insert into grants (grantId, title, workspaceId, chainId) values ${insertString}`)
  // console.log('chain updated', chainId, rows)
  const [updatedRows, updatedFields] = await sql.execute(`update syncedTill set skip = skip + ${grants.length} where chainId=${chainId} && tableName='${tables['grants'].tableName}'`)
  return true
}