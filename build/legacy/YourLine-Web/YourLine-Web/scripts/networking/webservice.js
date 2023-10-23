const graphQLURL = 'http://yourline.duckdns.org/query'
const graphQLURL = 'http://yourline-server.duckdns.org/query'

// Functions
function queryFetch(query, variables) {
    console.log("calling queryFetch()")
    console.log(query)
    console.log(variables)
    return fetch(graphQLURL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }).then(res => res.json())
  }
