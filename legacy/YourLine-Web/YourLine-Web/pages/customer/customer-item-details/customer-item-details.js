const defaultState = "default"
const previewState = "preview"

function onload() {
    let id = getItemIdFromUrl()
    let state = getState()
    const stateLabel = document.querySelector('.state-label')

    console.log("state", state)
    switch (state) {
        case defaultState:
            break
        case previewState:
            const quantityInput = document.querySelector('.custom-select ')
            quantityInput.disabled = true
            quantityInput.opacity = 0.3

            const button = document.querySelector('.submit-button')
            button.disabled = true
            button.style.backgroundColor = 'grey';
            button.style.opacity = 0.3
            stateLabel.style.display = 'block'
            break
        default:
            break
    }
    getItemForID(id)
}

function getItemForID(id) {
    fetchItemForID(id)
        .then(item => {
            console.log("Item found", item)
            updateUIWithItem(item)
        })
}

function updateUIWithItem(item) {
    let nameLabel = document.querySelector('.item-name')
    let descLabel = document.querySelector('.item-desc')
    let itemImage = document.querySelector('.item-image')
    let priceLabel = document.querySelector('.price-label')

    let itemName = item.name
    let imageUrl = item.mainImage
    let itemDesc = item.description
    let value = item.value

    nameLabel.textContent = itemName
    descLabel.textContent = itemDesc
    itemImage.src = imageUrl
    priceLabel.textContent = "£" + value

    console.log("Updating item with item", item)
}

// MARK: Purchasing

function shouldAddItemToCart() {
    const itemId = getItemIdFromUrl();
    let count = document.querySelector('.custom-select').value
    console.log(itemId)

    let userID = localStorage.getItem("user_id")

    console.log(userID)

    addItemToCart(userID, itemId, count)
        .then(data => {
            didAddItemToCart(data)
        })

    return true
}

function didAddItemToCart(data) {
    console.log(data)
    console.log("item added to cart")
}

// Helper
function getItemIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getState() {
    const urlParams = new URLSearchParams(window.location.search);
    let state = urlParams.get('state')
    if (state == null) {
        return "default"
    }

    return state
}
