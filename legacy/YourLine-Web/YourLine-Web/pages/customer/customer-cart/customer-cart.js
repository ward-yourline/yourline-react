let items = new Array()
let userID = localStorage.getItem(kUserIDLocal)
let cartID = null
let user = null

function didLoad() {
    getCart()
    getUser()
    setupUI()
}

function removeItemFromCartAtIndex(index) {
    console.log(index)
    let item = items[index]

    if (item === undefined) {
        console.log("unknown type", item)
        return false
    }

    let cartItemId = item.id
    console.log(item)
    removeItemFromCartWithID(cartItemId)
        .then(success => {
            if (success) {
                getCart()
            }
        })
}

function getCart() {
    let totalPriceLabel = document.querySelector(".total-price-label")
    fetchCartForUserID(userID)
        .then(data => {
            console.log("get cart called with cart id:", data.id)
            console.log("get cart called with items", data.items)
            cartID = data.id
            items = data.items
            resetCart(items)
            if (items == null || items == undefined) {
                return
            }
            items.forEach(item => {
                createCell(item)
                let totalPrice = calculateTotalPrice(items)
                totalPriceLabel.textContent = `Total price: £${totalPrice}`
            })
        })
}

function getUser() {
    fetchUserForID(userID)
    .then( userResult => {
        console.log("user", userResult)
        user = userResult
    })
}

function didFinishCheckout() {
    console.log("didFinishCheckout")
    let purchaseDate = getCurrentDateTimeString()

    let transaction = []
    items.forEach((item, index) => {
        console.log(item, index)
        let totalPrice = item.value * item.quantity
        let order = buildTransactions(
            purchaseDate, 
            userID, 
            item.itemID, 
            item.quantity, 
            item.value, 
            totalPrice, 
            "paypal", // TODO
            "incomplete", // TODO
            user.address, 
            user.address,  // TODO: Shipping address
            ""
            )
        transaction.push(order)
        console.log("order", order)
    })

    if (transaction.length == 0) {
        return
    }

    createTransaction(
        transaction
    ).then(result => {
        console.log("Transaction created:", result);
        finish()
    }).catch(error => {
        console.error("Error creating transaction:", error);
    });
}

function finish() {
    deleteCart(cartID)
    .then( data => {
        if (data == true) {
            window.location.href = '../customer-payment-completion/customer-payment-completion.html'
        }
    })
}

function buildTransactions(purchaseDate, customerID, itemID, quantity, unitPrice, totalPrice, paymentMethod, transactionStatus, shippingAddress, billingAddress, additionalDetails) {
    const input = {
        purchaseDate,
        customerID,
        itemID,
        quantity,
        unitPrice,
        totalPrice,
        paymentMethod,
        transactionStatus,
        shippingAddress,
        billingAddress,
        additionalDetails
    }

    return input
}

function removeItem(value) {
    return arr.filter(item => item !== value)
}

function calculateTotalPrice(items) { 
    let price = 0.0
    items.forEach( item => {
        console.log("prices", item.value)
        price += item.value
    })

    const formattedPrice = price.toFixed(2)
    return parseFloat(formattedPrice).toFixed(2)
}

const quantitySelect = document.querySelector('.quantity-select');

quantitySelect.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    
    // Send the selected value to the backend using fetch or your preferred method
    sendToBackend(selectedValue);
});

function sendToBackend(value) {
    // Use fetch or your preferred method to send data to the backend
    const url = 'your-backend-url';
    const data = { quantity: value };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend if needed
        console.log('Backend response:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error sending data to backend:', error);
    });
}

// References

        /* user 
        {
    "id": "user_2Pxr0hbhyKVdtGAPUhx9eN230Re",
    "email": "customer@customer.com",
    "accountType": "standard",
    "username": "customer user",
    "userImage": "http://localhost:8081/image/eeab89b5-8408-48bf-9167-fe779162810c",
    "address": "32 Customer Street",
    "postCode": "XB1 8BP",
    "telephoneNumber": "078123 432334"
}
        */
        /* Items
        {
    "quantity": 1,
    "value": 15,
    "mainImage": "http://localhost:8081/image/d0441ea3-a8eb-4af3-8380-f3e09c63ac14",
    "name": "15' chicken royal",
    "id": "cart_item_2VS1DLJUHNbJ9WsyKWUbtuPxden"
}
 */