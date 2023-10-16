const createTransactionMutation = `
mutation CreateTransactions($input: [TransactionInput!]) {
    createTransaction(input: $input)
  }
  `

function createTransaction(input) {

    return queryFetch(createTransactionMutation, { input })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log(data.errors);
                throw data.errors[0];
            }

            return data.createTransaction;
        })
        .catch(error => {
            return error;
        });
}

const updateTransactionStatusMutation = `
mutation  UpdateTransactionStatus($transactionID: ID!, $newStatus: String) {
    updateTransactionStatus(transactionID: $transactionID, newStatus: $newStatus)
}
`

function updateTransactionStatus(status) {
    return queryFetch(updateTransactionStatusMutation, { input })
    .then(data => {
        // Check for errors in the response
        if (data.errors) {
            console.log(data.errors);
            throw data.errors[0];
        }

        return data.updateTransactionStatus;
    })
    .catch(error => {
        return error;
    });
}

const businessPendingTransactionsQuery = `
query getTransactionRequestsForBusiness($businessID: ID!) {
    getTransactionRequestsForBusiness(businessID: $businessID) {
        id
        purchaseDate
        customerID
        itemID
        businessID
        quantity
        unitPrice
        totalPrice
        paymentMethod
        transactionStatus
        shippingAddress
        billingAddress
        orderNumber
        createdDate
        additionalDetails  
        itemName      
    }
}
`

function fetchPendingTransactionsForBusinessID(businessID) {
    if (businessID == null) {
        return []
    }
    return queryFetch(businessPendingTransactionsQuery, { businessID })
    .then(data => {
        // Check for errors in the response
        if (data.errors) {
            console.log(data.errors);
            throw data.errors[0];
        }

        if (data.data.getTransactionRequestsForBusiness == null) {
            return []
        }

        return data.data.getTransactionRequestsForBusiness
    })
    .catch(error => {
        return error;
    });
}

const getTransactionForIDQuery = `
query getTransaction($id: ID!) {
    getTransaction(id: $id) {
        id
        purchaseDate
        customerID
        itemID
        businessID
        quantity
        unitPrice
        totalPrice
        paymentMethod
        transactionStatus
        shippingAddress
        billingAddress
        orderNumber
        createdDate
        additionalDetails  
        itemName   
    }
}
`

function fetchTransactionForID(id) {
    if (id == null) {
        return []
    }
    return queryFetch(getTransactionForIDQuery, { id })
    .then(data => {
        // Check for errors in the response
        if (data.errors) {
            console.log(data.errors);
            throw data.errors[0];
        }

        if (data.data.getTransaction == null) {
            return []
        }

        return data.data.getTransaction
    })
    .catch(error => {
        return error;
    });
    
}