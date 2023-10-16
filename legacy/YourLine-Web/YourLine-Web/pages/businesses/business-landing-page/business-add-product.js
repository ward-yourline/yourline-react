let productID = undefined
let categoryID = undefined
let parentID = undefined
let businessID = undefined
let editState = false
let item = undefined
let imageURL = "http://localhost:8081/image/62a59176-5846-45d0-b14c-be896f5a90df"
let isNewImage = false

let imageInput = null
let selectedImage = null

const deleteButton = document.querySelector('.destructive-button')
const freezeItemCheckbox = document.querySelector('.item-visible')

function getProductID() {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("productID");
    console.log("productID:", productID);
    return productID
}

function getCategoryID() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryID = urlParams.get(kCategoryID);
    return categoryID
}

function getParentID() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryID = urlParams.get("parent_id");
    console.log("parentID:", categoryID);
    return categoryID
}

function getBusinessID() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessID = urlParams.get("business_id");
    console.log("businessID:", businessID);
    return businessID
}

// Properties
const FieldType = Object.freeze({
    IMAGE: 'image',
    TEXT: 'text',
    NUMERIC: 'numeric'
});

let fields = [
    { id: "product_image", name: "Image", type: FieldType.IMAGE, placeholder: "Add a main image for your product ...", resource: "../../../assets/product_placeholder.jpeg" },
    { id: "product_name", name: "Product name *", type: FieldType.TEXT, placeholder: "Add a name for your product ...", resource: "" },
    { id: "product_desc", name: "Description *", type: FieldType.TEXT, placeholder: "Add a description for your product ...", resource: "" },
    { id: "product_value", name: "Value (£) *", type: FieldType.NUMERIC, placeholder: "Add the price for your product ...", resource: "" },
    { id: "product_stock", name: "Stock *", type: FieldType.NUMERIC, placeholder: "Add the stock for your product ...", resource: "" }

]

// Methods
function onLoad() {
    categoryID = getCategoryID()
    productID = getProductID()
    parentID = getParentID()
    businessID = getBusinessID()

    console.log("productID:", productID)
    console.log("categoryID:", categoryID)
    console.log("businessID", businessID)

    enableSaveButton(false)
    enableDeleteButton(false)

    if (productID != undefined || productID != null) {
        setUIForEditState(true)
        fetchItemForID(productID)
            .then(data => {
                item = data
                imageURL = item.mainImage
                console.log(item)
                createFieldsForItem(item)
                enableDeleteButton(true)
                freezeItemCheckbox.checked = item.isVisible
                initialise()
            })
    } else {
        setUIForEditState(false)
        createFields()
        initialise()
    }
}

function setUIForEditState(editEnabled) {
    let submitButton = document.querySelector('.submit-button')
    let titleLabel = document.querySelector('.title-label')

    if (editEnabled) {
        editState = editEnabled
        submitButton.textContent = "Save Changes"
        titleLabel.textContent = "Edit Product"
    } else {
        submitButton.textContent = "Add Product"
        titleLabel.textContent = "Add Product"
    }
}

function initialise() {
    imageInput = document.getElementById("imageFile");
    selectedImage = document.getElementById("product_image"); // Define this element

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        console.log("||***********")

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                selectedImage.src = event.target.result;
                selectedImage.style.display = "block";

                const backgroundImage = `url('${event.target.result}')`;
                const imageDiv = document.getElementById("product_image"); // Use the correct field ID
                imageDiv.style.backgroundImage = backgroundImage;
            };

            reader.readAsDataURL(file);
            isNewImage = true
        } else {
            selectedImage.src = "";
            selectedImage.style.display = "none";

            const imageDiv = document.getElementById(field.id); // Use the correct field ID
            imageDiv.style.backgroundImage = "none";
            isNewImage = false
        }
        enableSaveButton(true)
    });
}

function createFields() {
    let cells = document.querySelector('.cells')

    fields.forEach(field => {

        var cell = undefined

        switch (field.type) {
            case FieldType.IMAGE:
                cell = createImageField(field, imageURL)
                break
            case FieldType.TEXT:
                cell = createTextField(field, "")
                break
            case FieldType.NUMERIC:
                cell = createNumericField(field, "")
                break
        }

        cells.appendChild(cell)
    })
}

function createFieldsForItem(item) {
    let cells = document.querySelector('.cells')

    let name = item.name
    let desc = item.description
    let price = item.value
    let stock = item.stock == null ? 0 : item.stock

    fields.forEach(field => {

        var cell = undefined

        switch (field.type) {
            case FieldType.IMAGE:
                cell = createImageField(field, item.mainImage)
                break
            case FieldType.TEXT:
                let textValue = null
                if (field.id == "product_name") {
                    textValue = name
                }
                if (field.id == "product_desc") {
                    textValue = desc
                }
                cell = createTextField(field, textValue)
                break
            case FieldType.NUMERIC:
                let numericValue = null
                let isDecimal = false
                if (field.id == "product_value") {
                    numericValue = price
                }
                if (field.id == "product_stock") {
                    numericValue = stock
                }
                cell = createNumericField(field, numericValue, isDecimal)
                break
        }

        cells.appendChild(cell)
    })
}

function createTextField(field, value) {
    let cell = document.createElement('div')
    cell.classList.add("cell")
    cell.innerHTML = `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                    <div style="
                    display: flex; 
                    flex-direction: 
                    row; gap: 40px; 
                    justify-content: space-between; 
                    width: 100%; 
                    padding: 20px;
                    ">
                        <div style="width: 100%;">
                            <h3 style="margin-block: 0px; margin-bottom: 10px">${field.name}</h3>
                            <input id='${field.id}'
                            style="width: 100%; height: 40px; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 10px; padding-inline: 20px;" 
                            placeholder="${field.placeholder}" type="text" required value="${value}"
                            oninput="enableSaveButton(true)"
                            >
                        </div>
                    </div>
                </span>
            `
    return cell
}

function createNumericField(field, value, isDecimal) {
    let cell = document.createElement('div')
    cell.classList.add("cell")
    cell.innerHTML = `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                    <div style="
                    display: flex; 
                    flex-direction: 
                    row; gap: 40px; 
                    justify-content: space-between; 
                    width: 100%; 
                    padding: 20px;
                    ">
                        <div style="width: 100%;">
                            <h3 style="margin-block: 0px; margin-bottom: 10px">${field.name}</h3>
                            <input id='${field.id}' 
                            style="width: 100%; height: 40px; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 10px; padding-inline: 20px;" 
                            placeholder="${field.placeholder}" step="${isDecimal ? 0.1 : 1}" type="number" required value="${value}"
                            oninput="enableSaveButton(true)"
                            >
                        </div>
                    </div>
                </span>
            `
    return cell
}

function createImageField(field, imageURL) {
    let cell = document.createElement('div')
    console.log(imageURL)
    cell.innerHTML =
        `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                        <div style="
                        display: flex; 
                        flex-direction: 
                        row; gap: 40px; 
                        justify-content: space-between; 
                        width: 100%; 
                        padding: 20px;
                        ">
                            <div style="width: 100%; overflow: hidden; max-width: 100%;">
                                <h3 style="margin-block: 0px; margin-bottom: 10px">${field.name}</h3>
                                <div id='${field.id}' style="
                                    max-width: 100%;
                                    height: auto;
                                    aspect-ratio: 16/12;
                                    background-position: center;
                                    background-repeat: no-repeat;
                                    background-size: contain;
                                    background-image: url('${imageURL}');
                        ">
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 10px">
                    <form id="imageForm" method="post" enctype="multipart/form-data" onsubmit="didTapUploadImageButton(event); return false;">
                        <label for="file"></label>
                        <input id="imageFile" name="file" type="file" />
                    </form>
                    </div>
                </div>
                        </div>
                    </div>
                </span>
            `
    return cell
}

async function didTapUploadImageButton(event) {
    event.stopPropagation();
    event.preventDefault();

    uploadImage()
}

function uploadImage() {
    const form = document.querySelector('#imageForm'); // Use the form's FormData object

    if (form) {
        return uploadImageFromForm(form)
            .then(response => {
                console.log("Image uploaded successfully:", response);
                // Perform any additional actions here after successful upload
                imageURL = response;
                return response
            })
            .catch(error => {
                console.error("Image upload error:", error);
                // Handle error if needed
            });
    } else {
        console.log("Image form not found.");
    }

    return new Promise(function (resolve, reject) {
        reject(false)
    })
}

function save(event) {
    event.stopPropagation()

    console.log("save() called")

    let productImage = imageURL
    let productName = document.querySelector('#product_name').value.trim()
    let productDesc = document.querySelector('#product_desc').value.trim()
    let productValue = document.querySelector('#product_value').value
    let stock = document.querySelector('#product_stock').value
    let type = "product"
    let categoryID = getCategoryID()

    if (productName === '') {
        console.log('Product name is required');
        window.alert('enter a name for your product')
        return false;
    }

    if (productDesc === '') {
        console.log('Product description is required');
        window.alert('enter a description for your product')
        return false;
    }

    if (productValue <= 0) {
        console.log('Product value is required');
        window.alert('enter a value for your product')
        return false;
    }

    console.log(productImage)
    console.log(productName)
    console.log(productDesc)
    console.log(productValue)
    console.log(type)
    console.log(categoryID)

    if (isNewImage) {
        uploadImage()
            .then(newImageURL => {
                if (editState) {
                    let uploadImage = null
                    if (productImage == item.mainImage) {
                        uploadImage = productImage
                    }
                    shouldEditItemWith(productID, productName, newImageURL, productDesc, productValue)
                    .then(data => {
                        setStock(stock)
                    })
                } else {
                    // TODO: properly set the isVisible and isPurchasable values
                    shouldCreateItemWith(businessID, imageURL, categoryID, productName, productDesc, type, productValue, parentID, true, false)                    
                    .then(data => {
                        setStock(stock)
                    })
                }
            })
    } else {
        if (editState) {
            let uploadImage = null
            if (productImage == item.mainImage) {
                uploadImage = productImage
            }
            shouldEditItemWith(productID, productName, imageURL, productDesc, productValue)
            .then(data => {
                setStock(stock)
            })
        } else {
            // TODO: properly set the isVisible and isPurchasable values
            shouldCreateItemWith(businessID, imageURL, categoryID, productName, productDesc, type, productValue, parentID, true, false)
            .then(data => {
                setStock(stock)
            })
        }
    }
}

function shouldEditItemWith(itemID, name, mainImage, description, value) {
    return editItemWith(itemID, name, mainImage, description, value)
        .then(data => {
            showToast("Product updated", document.querySelector("body"))
            enableSaveButton(false)
            return true
        }).catch(error => {
            window.alert(error)
        })
}

function shouldCreateItemWith(businessID, image, catID, name, desc, type, value, parentID, isPurchable, isVisible) {
    return createItem(businessID, image, catID, name, desc, type, value, parentID, isPurchable, isVisible)
        .then(data => {
            productID = data.data.createItem.id
            getItem(productID)
            showToast("Product created", document.querySelector("body"));
            enableSaveButton(false)
            enableDeleteButton(true)
            return true
        }).catch(error => {
            window.alert(error)
        })
}

function addItemToParenItemItNeeded(childID) {
    let parentID = getParentID()
    if (parentID != undefined && parentID != null) {
        console.log("parentID found", parentID)
        addChildItemToParentItem(parentID, childID)
    }
}

function getItem(id) {
    fetchItemForID(id)
        .then(resonseItem => {
            item = resonseItem
            setUIForEditState(true)
        })
}

function finish(event) {

    event.stopPropagation()

    window.history.back()
}

function enableSaveButton(enabled) {
    let saveButton = document.querySelector('.save-button')

    console.log(enabled ? "enabled" : "disabled")

    if (enabled) {
        saveButton.disabled = false
        saveButton.style.backgroundColor = '3b5e69'
        saveButton.style.opacity = 1.0
    } else {
        saveButton.disabled = true
        saveButton.style.backgroundColor = 'gray'
        saveButton.style.opacity = 0.3
    }
}

function enableDeleteButton(show) {
    deleteButton.style.display = show ? 'block' : 'none'
}

function deleteItem() {
    if (confirm("Are you sure you want to delete this product?")) {
        deleteItemWithID(item.id)
        .then(response =>{
            window.history.back()
        })
        .catch(error =>{
            window.alert(error)
        })
    }
}

async function freezeProduct(event, checbox) {
    console.log("freeze status being sent", !checbox.checked)
    freezeItem(item.id, !checbox.checked)
        .then(data => {
            console.log("freeze status after", item.isVisible)
            item.isVisible = !checbox.checked
        })
        .catch(error => {
            window.alert(error)
        })
}

function setStock(value) {
    console.log("setting stock")
    setStockQuantity(productID, value)
    .then(data =>{
        console.log("set stock quantity response", data)
        // TODO
    })
}