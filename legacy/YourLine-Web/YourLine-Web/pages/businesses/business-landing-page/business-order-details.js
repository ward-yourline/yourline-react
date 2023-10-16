class TransactionObject {
    constructor(item, transaction) {
        this.item = item
        this.transaction = transaction
    }
}

let transaction = null

function onload() {
    const transactionID = getOrderIDFromURL();
    const itemID = getItemIdFromUrl();

    // Use Promise.all to wait for both promises to resolve
    Promise.all([getTransactionForID(transactionID), getItemForID(itemID)])
        .then(([transactionResponse, itemResponse]) => {
            console.log("Transaction:", transactionResponse);
            console.log("Item:", itemResponse);
            transaction = new TransactionObject(itemResponse, transactionResponse)
            updateUIWithTransaction(transaction)
        })
        .catch(error => {
            alert(error);
        });
}

function getTransactionForID(transactionID) {
    return fetchTransactionForID(transactionID)
        .catch(error => {
            alert(error);
            throw error;
        });
}

function getItemForID(id) {
    return fetchItemForID(id)
        .catch(error => {
            alert(error);
            throw error;
        });
}


function updateUIWithTransaction(transaction) {
    console.log("updating UI with item", transaction)
    const descLabel = document.querySelector('.item-desc')
    const itemImage = document.querySelector('.item-image')
    const itemNameLabel = document.querySelector('.item-name')
    const statusLabel = document.querySelector('.item-status')

    descLabel.textContent = transaction.item.description
    itemImage.src = transaction.item.mainImage
    itemNameLabel.textContent = transaction.item.name

    let statusClass = ""
        switch (transaction.transaction.transactionStatus) {
            case "incomplete":
                statusClass = "status-incomplete"
                break
            case "completed":
                statusClass = "status-completed"
                break
            case "pending":
                statusClass = "status-pending"
                break
            case "canceled":
                statusClass = "status-canceled"
                break
        }
    statusLabel.innerHTML = `<p class="${statusClass}">${transaction.transaction.transactionStatus}</p>`
}

function didTapDispatchOrderButton() {

}

function didTapCompleteOrderButton() {

}

function didTapCancelOrderButton() {

}

function getOrderIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('order_id');
}

function getItemIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('item_id');
}