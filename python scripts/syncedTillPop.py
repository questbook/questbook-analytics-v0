chainId = list(map(
    int, 
    ['4', '5', '10', '40', '41', '42', '69', '100', '137', '588', '1001', '1088', '1287', '2153', '8217', '9000', '42220', '44787', '80001', '245022926', '1313161555', '1666600000', '1666700000']
  )
)
tables = ['workspaces', 'grantApplications', 'grants', 'funding']
insertValues = []
for t in tables:
  for c in chainId:
    insertValues.append('({0}, \'{1}\', 0)'.format(c, t))


s = ''
for v in insertValues:
  s = s + v + ', '

print(s)