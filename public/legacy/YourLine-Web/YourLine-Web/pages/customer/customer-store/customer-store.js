// Variables
let items = undefined
let itemType = ""
let searchItemString = ""
const showAllRadio = document.querySelector('.show-all-radio')
const showServicesRadio = document.querySelector('.show-services-radio')
const showProductsRadio = document.querySelector('.show-products-radio')
const searchInput = document.querySelector('.search-products');

const itemTypeKey = "yl_item_type_key"
const searchStringKey = "yl_search_string_key"

// Functions
function onload() {

    let itemTypeStored = sessionStorage.getItem(itemTypeKey)
    let searchString = sessionStorage.getItem(searchStringKey)

    if (searchString != null || itemTypeStored != null) {

        console.log("item type stored", itemTypeStored)
        console.log("searchString  stored", searchString)

        switch (itemTypeStored) {
            case "product":
                showProductsRadio.checked = true
                break
            case "service":
                showServicesRadio.checked = true
                break
            default:
                showAllRadio.checked = true
                break
        }
        
        if (searchString != null) {
            searchInput.value = searchString
            searchItemString = searchString
        }
        fetchItems()
    } else {
        showAllRadio.checked = true
        getAllItems(itemType)
    }
}

function getAllItems(itemType) {
    fetchAllItems(itemType)
        .then(items => {
            this.items = items
            console.log("found items", this.items)
            reloadviewWithItems(this.items)
        })
}
// Callback methods
function didSelectItemAtIndex(index) {
    let item = this.items[index]
    return item
}


function shouldAddItemToCart(item) {
    console.log(item.id)

    let userID = localStorage.getItem("user_id")

    console.log(userID)

    addItemToCart(userID, item.id, 1)
        .then(data => {
            console.log(data)
            // TODO
        })

    return true
}

function reloadTable() {
    let element = document.querySelectorAll('ul')[0]
    console.log("store reloaded", element)

    while (element.firstChild) {
        console.log(`first child removed ${element.firstChild}`)
        element.removeChild(element.firstChild);
    }

    return new Promise(function (resolve, rejected) {
        resolve(true)
    })
}

// Search for products

searchInput.addEventListener('input', function () {
    let inputText = this.value.toLowerCase();
    let itemType = sessionStorage.getItem(itemTypeKey)
    debounce(() => {
        console.log("trimmed input", inputText.trim())
        if (inputText.trim().length == 0) {
            console.log("getting all items")
            sessionStorage.setItem(searchStringKey, "")
            getAllItems(itemType)
        } else {
            console.log("getting items for string", inputText)
            searchItems(inputText)
        }
    }, 300);
});

function searchItems(text, itemType) {
    searchItemString = text
    console.log("search string", text)
    sessionStorage.setItem(searchStringKey, text)
    fetchItems()
}

function fetchItems() {
    console.log("fetchItems called")
    let searchString = sessionStorage.getItem(searchStringKey)
    let itemType = sessionStorage.getItem(itemTypeKey)

    console.log("fetchItems called", searchString, itemType)

    fetchItemsForString(searchString, 100, itemType, "")
        .then(items => {
            this.items = items
            console.log("searchItems found items", this.items)
            reloadviewWithItems(this.items)
        })
}

function didSelectServices(event, radio) {
    sessionStorage.setItem(itemTypeKey, "service")
    fetchItems()
}

function didSelectProducts(event, radio) {
    sessionStorage.setItem(itemTypeKey, "product")
    fetchItems()
}

function didSelectAll() {
    sessionStorage.setItem(itemTypeKey, "")
    fetchItems()
}