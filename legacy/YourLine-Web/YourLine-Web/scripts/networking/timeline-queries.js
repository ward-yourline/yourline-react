const fetchTimeLineitemsQuery = `
query GetTimeLineItems($userID: ID!) {
    getTimeLineItems(userID: $userID) {
        id
        content
        year
        month
        day
        time
    }
}
`

function fetchTimeLineItems(userID) {
  let input = { userID }
  return queryFetch(fetchTimeLineitemsQuery, input)
    .then(data => {
      console.log(data)
      if (data.data.getTimeLineItems == null) {
        return []
      }
      return data.data.getTimeLineItems
    }).catch(error => {
      console.log(error)
      return error
    })
}