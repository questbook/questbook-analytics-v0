// const TABLES = ['workspaces', 'grants', 'grantApplicants']
type TableData = {
  tableName: string,
  query: string,
}

const TABLES: {[key: string]: TableData} = {
  workspaces: {
    tableName: 'workspaces',
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
  },
  grants: {
    tableName: 'grants',
    query: `
      query grants($first: Int!, $skip: Int!) {
        grants(
          subgraphError: allow,
          first: $first,
          skip: $skip,
        ) {
          id
          title
          workspace {
            id
          }
        }
      }
    `,
  },
  grantApplications: {
    tableName: 'grantApplications',
    query: `
      query grantApplications($first: Int!, $skip: Int!) {
        grantApplications(
          subgraphError: allow,
          first: $first,
          skip: $skip,
        ) {
          id
          applicantId
          createdAtS
          updatedAtS
          state
          grant {
            id
          }
        }
      }
    `,
  },
  funding: {
    tableName: 'funding',
    query: `
      query fundsTransfers($first: Int!, $skip: Int!) {
        fundsTransfers(
          subgraphError: allow,
          first: $first,
          skip: $skip,
          where: {
            application_not: null
          }
        ) {
          id
          application {
            id
          }
          amount
          grant {
            reward {
              asset
            }
          }
          createdAtS
        }
      }
    `,
  }
}

export {TABLES, TableData}
