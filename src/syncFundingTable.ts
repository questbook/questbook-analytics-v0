import mysql from 'mysql2/promise';
import axios from 'axios';
import { TableData, TABLES } from './tables';
import { SUBGRAPH_ENDPOINTS } from './subgraphEndpoints';
import { CHAIN_INFO } from './psuedo-generated';
import { ethers } from 'ethers';
import { calculateUSDValue } from './utils';

const tables = TABLES;
const endpoints = SUBGRAPH_ENDPOINTS;

export const syncFundingTable = async (sql: mysql.Connection) => {
  const table = tables['funding'];

  const defaultSkip = (await getUpdatedTillRows(sql, table.tableName)) as {
    chainId: number;
    skip: number;
  }[];
  // console.log(defaultSkip)

  const allFunding = await Promise.all(
    defaultSkip.map(async (element) => {
      const funding = await getNewFundingForChainFromSubgraph(
        element.chainId,
        element.skip
      );
      // console.log(element.chainId, grants.length)
      if (funding.length > 0) {
        await insertNewFunding(sql, element.chainId, funding);
      }
      return funding;
    })
  );

  return allFunding;
};

const getUpdatedTillRows = async (
  sqlConnection: mysql.Connection,
  tableName: string
) => {
  // console.log(`select chainId, skip from syncedTill where tableName='${tableName}'`)
  const [rows, fields] = await sqlConnection.execute(
    `select chainId, skip from syncedTill where tableName='${tableName}'`
  );
  return rows;
};

const getNewFundingForChainFromSubgraph = async (
  chainId: number,
  defaultSkip = 0
) => {
  let first = 100;
  let skip = defaultSkip;

  let grants: any[] = [];
  const endpoint = endpoints.find(
    (endpoint) => endpoint.chainId == chainId
  )?.endpoint;
  if (!endpoint) return [];

  while (true) {
    let body = {
      query: tables['funding'].query,
      variables: {
        first,
        skip,
      },
    };
    try {
      const result = await axios.post(endpoint, body);
      if (
        result.data?.data?.fundsTransfers &&
        result.data.data.fundsTransfers.length > 0
      ) {
        grants = [...grants, ...result.data.data.fundsTransfers];
        skip += first;
      } else {
        break;
      }
    } catch (e) {
      break;
    }
  }

  // console.log(grants[0].workspace.id)
  return grants;
};

const insertNewFunding = async (
  sql: mysql.Connection,
  chainId: number,
  funds: any[]
) => {
  const insertString = await Promise.all(
    funds.map(async (fund: any) => {
      const createdAt = new Date(fund.createdAtS * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      // const amount = BigInt(fund.amount).toString()
      const tokenInfo =
        CHAIN_INFO[chainId]?.supportedCurrencies[
          fund.grant.reward.asset.toLowerCase()
        ];

      // Storing fund amount / 10**18 by default
      const amount = (
        BigInt(fund.amount) / BigInt(10 ** (tokenInfo?.decimals ?? 18))
      ).toString();

      const tokenValue = ethers.utils
        .formatUnits(amount, tokenInfo?.decimals || 18)
        .toString();

      console.log(
        tokenValue,
        tokenInfo,
        fund.grant.reward.asset.toLowerCase(),
        chainId
      );

      let usdAmt = amount;
      try {
        let v
        if (tokenInfo?.pair) {
          v = await calculateUSDValue(tokenValue, tokenInfo.pair!);
        } else {
          v = tokenValue
        }
       
        // console.log('v', v);
        if (v !== 0) {
          usdAmt = v.toString();
        }
      } catch (e) {
        usdAmt = '0';
        console.log('error converting', e)
      }

      // console.log(amount);

      return `('${fund.id}', '${fund.application.id}', ${amount}, '${fund.grant.reward.asset}', '${createdAt}', ${chainId})`;
    })
  );
  // console.log(insertString.join(','))
  const [rows, fields] = await sql.execute(
    `insert into funding (fundingId, applicationId, amount, asset, time, chainId) values ${insertString}`
  );
  // console.log('chain updated', chainId, rows)
  const [updatedRows, updatedFields] = await sql.execute(
    `update syncedTill set skip = skip + ${funds.length} where chainId=${chainId} && tableName='${tables['funding'].tableName}'`
  );
  return true;
};
