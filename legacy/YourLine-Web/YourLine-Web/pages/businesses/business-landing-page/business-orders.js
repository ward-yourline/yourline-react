function onload() {
    console.log("loaded")
    let userID = getUserID()
    let businessID = getParameterFromUrl('business_id')
    // Return the promise here to propagate it to the next `.then()` block.
    return fetchPendingTransactionsForBusinessID(businessID)
        .then(transactions => {
            console.log("transaction data result", transactions);
            reloadTableWithBusinesses(transactions);
        })
        .catch(error => {
            window.alert(error);
            // Re-throw the error to propagate it up the chain if needed.
            throw error;
        });
}

function getBusinessForUserID(userID) {
    fetchBusinessesForUserID(userID)
        .then(businesses => {
            console.log("onLoad data retrieved:", data);
            console.log("business ID:", data);

            return getTransactionsForBusinesses(businesses);
        })
        .then(transactions => {
            console.log("transactions", transactions);
            reloadTableWithBusinesses(transactions);
        })
        .catch(error => {
            window.alert(error);
        });
}

function openOrder(order) {
    window.location.href = `business-order-details.html?order_id=${order.id}&item_id=${order.itemID}`
}