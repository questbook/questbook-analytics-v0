import mysql from 'mysql2/promise';
import axios from 'axios';
import { TableData, TABLES } from './tables';
import { SUBGRAPH_ENDPOINTS } from './subgraphEndpoints';

const tables = TABLES
const endpoints = SUBGRAPH_ENDPOINTS

export const syncWorkspacesTable = async (sql: mysql.Connection) => {
  const table = tables['workspaces']

  const defaultSkip = await getUpdatedTillRows(sql, table.tableName) as {chainId: number, skip: number}[]
  // console.log(defaultSkip)
  
  const allWorkspaces = await Promise.all(defaultSkip.map(async (element) => {
    const workspaces = await getNewWorkspacesForChainFromSubgraph(element.chainId, element.skip)
    // console.log(element.chainId, workspaces.length)
    if (workspaces.length > 0) {
      await insertNewWorkspaces(sql, element.chainId, workspaces)
    }
    return workspaces
  }))

  return allWorkspaces
}

const getUpdatedTillRows = async (sqlConnection: mysql.Connection, tableName: string) => {
  // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  const [rows, fields] = await sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  return rows
}

const getNewWorkspacesForChainFromSubgraph = async (chainId: number, defaultSkip = 0) => {
  let first = 100
  let skip = defaultSkip

  let workspaces: any[] = []
  const endpoint = endpoints.find((endpoint) => endpoint.chainId == chainId)?.endpoint
  if (!endpoint) return []
  
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
    try {
      const result = await axios.post(
        endpoint, 
        body
      )
      if (result.data?.data?.workspaces && result.data.data.workspaces.length > 0) {
        workspaces = [...workspaces, ...result.data.data.workspaces]
        skip += first
      } else {
        break
      }
    } catch (e) {
      break
    }
  }
  return workspaces
}

const insertNewWorkspaces = async (sql: mysql.Connection, chainId: number, workspaces: any[]) => {
  const insertString = workspaces.map((workspace: any) => 
  `('${workspace.id}', '${workspace.title.replace("'", "''")}', ${chainId})`
  )
  // console.log(insertString.join(','))
  const [rows, fields] = await sql.execute(`insert into workspaces (workspaceId, title, chainId) values ${insertString}`)
  // console.log('chain updated', chainId, rows)
  const [updatedRows, updatedFields] = await sql.execute(`update syncedTill set skip = skip + ${workspaces.length} where chainId=${chainId} && tableName='${tables['workspaces'].tableName}'`)
  return true
}