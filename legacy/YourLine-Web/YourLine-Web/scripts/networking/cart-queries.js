let fetchCartForUserIDQuery = `query FetchCartForUser($id: ID!) {
    fetchCartForUser(userID: $id, limit: 100) {
          id
          items {
            quantity
            value
            mainImage
            name
            id
            cartID
            itemID
        }
    }
  }`

function fetchCartForUserID(id) {
    return queryFetch(fetchCartForUserIDQuery, { id })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred during signing up:", data.errors);
                throw data.errors[0];
            }

            console.log(data);

            // Save the user data to local storage
            const cart = data.data.fetchCartForUser;
            if (cart == null) {
                return []
            }

            if (cart.items != null) {
                const count = cart.items.length
                setLocalCart(count)
            } else {
                setLocalCart(0)
            }
            return cart
        })
        .catch(error => {
            return showError(error, "fetchCartForUserID")
        });
}

let addItemToCartMutation = `mutation AddItemToCart($userID: ID!, $itemID: ID!, $quantity: Int!) {
    addItemToCart(userID: $userID, itemID: $itemID, quantity: $quantity)
}`

function addItemToCart(userID, itemID, quantity) {
    return queryFetch(addItemToCartMutation, { userID, itemID, quantity })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred addItemToCart:", data.errors);
                throw data.errors[0];
                return false
            }
            console.log("response: ", data);
            incrementLocalCart()
            return true
        })
        .catch(error => {
            return showError(error, "addItemToCart")
        });
}

let removeItemFromCartMutation = `mutation RemoveItemFromCart($cartItemID: ID!) {
    removeItemFromCart(cartItemID: $cartItemID)
  }`

function removeItemFromCartWithID(cartItemID) {
    return queryFetch(removeItemFromCartMutation, { cartItemID })
    .then(data => {
        // Check for errors in the response
        if (data.errors) {
            console.log("Error occurred removeItemFromCart:", data.errors);
            throw data.errors[0];
            return false
        }
        console.log("response: ", data);
        decrementLocalCart()
        return true
    })
    .catch(error => {
        return showError(error, "removeItemFromCart")
    });
}

let deleteCartWithIDMutation = `
mutation DeleteCart($cartID: ID!) {
    deleteCart(cartID: $cartID) 
  }
`

function deleteCart(cartID) {
    console.log("caling deleteCart with id", cartID)
    return queryFetch(deleteCartWithIDMutation, { cartID })
    .then( data => {
        if (data.errors) {
            console.log("Error occurred deleteCart:", data.errors);
            throw data.errors[0];
            return false
        }
        console.log("response: ", data);
        resetLocalCart()
        return true
    })
    .catch( error => {
        return showError(error, "deleteCart")
    })
}

function incrementLocalCart() {
    let count = localStorage.getItem("cart_count")
    if (count == null || count == undefined) {
        count = 0
    }
    count++
    localStorage.setItem("cart_count", count)
}

function decrementLocalCart() {
    let count = localStorage.getItem("cart_count")
    if (count == null || count == undefined) {
        count = 0
        return
    } else {
        count--
    }
    localStorage.setItem("cart_count", count)
}

function resetLocalCart() {
    localStorage.setItem("cart_count", 0)
}

function setLocalCart(count) {
    localStorage.setItem("cart_count", count)
}