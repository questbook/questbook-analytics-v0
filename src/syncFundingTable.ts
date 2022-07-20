import mysql from 'mysql2/promise';
import axios from 'axios';
import { TableData, TABLES } from './tables';
import { SUBGRAPH_ENDPOINTS } from './subgraphEndpoints';

const tables = TABLES
const endpoints = SUBGRAPH_ENDPOINTS

export const syncFundingTable = async (sql: mysql.Connection) => {
  const table = tables['funding']

  const defaultSkip = await getUpdatedTillRows(sql, table.tableName) as {chainId: number, skip: number}[]
  // console.log(defaultSkip)
  
  const allFunding = await Promise.all(defaultSkip.map(async (element) => {
    const funding = await getNewFundingForChainFromSubgraph(element.chainId, element.skip)
    // console.log(element.chainId, grants.length)
    if (funding.length > 0) {
      await insertNewFunding(sql, element.chainId, funding)
    }
    return funding
  }))

  return allFunding
}

const getUpdatedTillRows = async (sqlConnection: mysql.Connection, tableName: string) => {
  // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  const [rows, fields] = await sqlConnection.execute(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  return rows
}

const getNewFundingForChainFromSubgraph = async (chainId: number, defaultSkip = 0) => {
  let first = 100
  let skip = defaultSkip

  let grants: any[] = []
  const endpoint = endpoints.find((endpoint) => endpoint.chainId == chainId)?.endpoint
  if (!endpoint) return []
  
  while (true) {
    let body = {
      query: tables['funding'].query,
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
      if (result.data?.data?.fundsTransfers && result.data.data.fundsTransfers.length > 0) {
        grants = [...grants, ...result.data.data.fundsTransfers]
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

const insertNewFunding = async (sql: mysql.Connection, chainId: number, funds: any[]) => {
  const insertString = funds.map((fund: any) => {
    const createdAt = new Date(fund.createdAtS*1000).toISOString().slice(0, 19).replace('T', ' ')

    // Storing fund amount / 10**6
    const amount = (BigInt(fund.amount)/BigInt(10**6)).toString()

    return `('${fund.id}', '${fund.application.id}', ${amount}, '${fund.grant.reward.asset}', '${createdAt}', ${chainId})` 
  })
  // console.log(insertString.join(','))
  const [rows, fields] = await sql.execute(`insert into funding (fundingId, applicationId, amount, asset, time, chainId) values ${insertString}`)
  // console.log('chain updated', chainId, rows)
  const [updatedRows, updatedFields] = await sql.execute(`update syncedTill set skip = skip + ${funds.length} where chainId=${chainId} && tableName='${tables['funding'].tableName}'`)
  return true
}