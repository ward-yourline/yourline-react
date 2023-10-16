let fetchBusinessesForUserIDQuery = `
  query FetchBusinessesForUserID($id: ID!) {
    fetchBusinessesForUserID(id: $id) {
      id
      userID
      name
      phoneNumber
      address
      sectors
      industries
      categoryIDS
      companyLogo
      createdDate
    }
  }`
function fetchBusinessesForUserID(id) {
    if (id == null) {
        return[]
    }

    console.log("getBusinessForUserID() called")
    console.log("ID: " + id)

    return queryFetch(fetchBusinessesForUserIDQuery, { id })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred getBusinessForUserID:", data.errors);
                throw data.errors[0];
            }


            console.log("response: ", data);

            let business = data.data.fetchBusinessesForUserID

            return business
        })
        .catch(error => {
            return showError(error, "fetchBusinessesForUserID")
        });
}

let fetchBusinessForIDQuery = `
query FetchBusinessForBusinessID($id: ID!) {
    fetchBusinessForBusinessID(id: $id) {
      id
      name
      address
      phoneNumber
      sectors
      industries
      companyLogo
    }
  }`

function fetchBusinessForID(id) {

    if (id == null) {
        return[]
    }

    return queryFetch(fetchBusinessForIDQuery, { id })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchBusinessForIDQuery:", data.errors);
                throw data.errors[0];
            }

            console.log("response: ", data);

            let business = data.data.fetchBusinessForBusinessID

            console.log(business)

            return business
        })
        .catch(error => {
            return showError(error, "fetchBusinessForIDQuery")
        });
}

const fetchItemsForBusinessIDQuery = `
query FetchItemsForBusinessID($id: ID!, $itemType: String) {
    fetchItemsForBusinessID(id: $id, itemType: $itemType) {
        name
        id
        type
        businessID
        categoryID
        description
        value
        mainImage
        isVisible
        stock
    }
  }`

function fetchItemsForBusinessID(id, itemType) {
    if (id == null) {
        return []
    }
    const input = { id, itemType }
    return queryFetch(fetchItemsForBusinessIDQuery, input)
        .then(data => {
            console.log("fetchItemsForBusinessID")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchItemsForBusinessID:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchItemsForBusinessID successful!");
            console.log(data);

            const items = data.data.fetchItemsForBusinessID;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchItemsForBusinessID")
        });
}