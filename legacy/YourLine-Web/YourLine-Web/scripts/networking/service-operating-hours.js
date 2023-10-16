const getOperatingHoursForServiceQuery = `
query GetOperatingHoursForService($id: ID!) {
    getOperatingHoursForService(id: $id) {
      itemID
      dayOfWeek
      startTime
      endTime
      isOpen
    }
  }`

function getOperatingHoursForService(id) {
    const input = { id }
    return queryFetch(getOperatingHoursForServiceQuery, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during getOperatingHoursForServiceQuery", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            if (data.data.getOperatingHoursForService == null) {
                return []
            }

            return data.data.getOperatingHoursForService
        })
        .catch(error => {
            return error
        });
}

const insertOperatingHoursMutation = `
mutation InsertOperatingHours($input: [ServiceOperatingHoursInput!]!) {
    insertOperatingHours(input: $input)
 }
`

function insertOperatingHours(hours) {
    const input = hours
    console.log("operating hours input", input)
    return queryFetch(insertOperatingHoursMutation, { input })
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during insertOperatingHoursMutation", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}

const removeOperatingHoursMutation = `
mutation RemoveOperatingHours($id: ID!, $dayOfWeek: String!) {
    removeOperatingHours(id: $id, dayOfWeek: $dayOfWeek)
  }
`

function removeOperatingHours(id, dayOfWeek) {
    let input = { id, dayOfWeek }
    return queryFetch(removeOperatingHoursMutation, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during removeOperatingHoursMutation", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}

const updateOperatingHoursMutation = `
mutation UpdateOperatingHours($input: [ServiceOperatingHoursInput!]!) {
    updateOperatingHours(input: $input)
   }
`

function updateOperatingHours(input) {
    return queryFetch(updateOperatingHoursMutation, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during updateOperatingHoursMutation", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}