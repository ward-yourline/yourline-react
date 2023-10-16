let insertStockToInventoryMutation = `
mutation InsertStockToInventory($itemID: ID!, $quantity: Int!) {
    insertStockToInventory(itemID: $itemID, quantity: $quantity)
  }
`

function insertStock(itemID, quantity) {
    const input = { itemID, quantity }
    return queryFetch(insertStockToInventoryMutation, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during insertStock", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}

let addStockToInventoryMutation = `
mutation addStockToInventory($itemID: ID!, $quantity: Int!) {
    addStockToInventory(itemID: $itemID, quantity: $quantity)
  }
`

function addStockToInventory(itemID, quantity) {
    const input = { itemID, quantity }
    return queryFetch(addStockToInventoryMutation, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during addStockToInventoryMutation", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}

let getStockQuantityQuery = `
query GetStockQuantity($itemID: ID!) {
    getStockQuantity(itemID: $itemID)
  }
`

function getStockQuantity(itemID) {
    const input = { itemID }
    return queryFetch(getStockQuantityQuery, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during getStockQuantityQuery", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            if (data == null) {
                return []
            }

            return data
        })
        .catch(error => {
            return error
        });
}

const setStockQuantityMuation = `
mutation SetStockQuantity($itemID: ID!, $quantity: Int!) {
    setStockQuantity(itemID: $itemID, quantity: $quantity)
  }
  `
function setStockQuantity(itemID, quantity) {
    const input = { itemID, quantity }
    return queryFetch(setStockQuantityMuation, input)
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during SetStockQuantity", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return error
        });
}
