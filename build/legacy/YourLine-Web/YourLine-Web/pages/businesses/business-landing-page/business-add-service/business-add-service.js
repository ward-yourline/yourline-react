let serviceID = null
let categoryID = null
let parentID = null
let editState = false
let item = null
let imageURL = "http://yourline-images.duckdns.org:81/image/62a59176-5846-45d0-b14c-be896f5a90df"
let isNewImage = false
let businessID = null

let imageInput = null
let selectedImage = null

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class OperatingHour {
    constructor(day, isOpen, fromTime, toTime) {
        this.day = day;
        this.isOpen = isOpen;
        this.fromTime = fromTime;
        this.toTime = toTime
    }
}

// MARK: Components
const deleteButton = document.querySelector('.destructive-button')

function getServiceID() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceID = urlParams.get("serviceID");
    console.log("serviceID:", serviceID);
    return serviceID
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

// Methods
function onLoad() {
    categoryID = getCategoryID()
    serviceID = getServiceID()
    parentID = getParentID()
    businessID = getBusinessID()

    console.log("serviceID:", serviceID)
    console.log("categoryID:", categoryID)
    console.log("businessID", businessID)
    console.log("parentID", parentID)

    enableEditingState(false)
    enableSaveButton(false)

    const tableDiv = document.querySelector('.operating-management')
    tableDiv.style.display = "none"

    if (serviceID != undefined || serviceID != null) {
        setUIForEditState(true)
        showAdditionalFields(true)
        fetchItemForID(serviceID)
            .then(data => {
                item = data
                imageURL = item.mainImage
                console.log(item)
                createFieldsForItem(item)
                getChildrenItems(item.childrenIDs)
                enableEditingState(true)
                createOperatingTable()
                getOperatingHours()
                initialise()
            })
    } else {
        setUIForEditState(false)
        showAdditionalFields(false)
        createFields()
        initialise()
    }
}

function initialise() {
    imageInput = document.getElementById("imageFile");
    selectedImage = document.getElementById("service_image"); // Define this element

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        console.log("||***********")

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                selectedImage.src = event.target.result;
                selectedImage.style.display = "block";

                const backgroundImage = `url('${event.target.result}')`;
                const imageDiv = document.getElementById("service_image"); // Use the correct field ID
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
    console.log("save() called")
    event.stopPropagation()

    let serviceImage = imageURL
    let serviceName = document.querySelector('#service_name').value.trim()
    let serviceDesc = document.querySelector('#service_desc').value.trim()
    let serviceValue = document.querySelector('#service_value').value
    let type = "service"
    let categoryID = getCategoryID()
    let itemIsVisible = false

    if (serviceName === '') {
        console.log('Service name is required');
        window.alert('enter a name for your service')
        return false;
    }

    if (serviceDesc === '') {
        console.log('Service description is required');
        window.alert('enter a description for your service')
        return false;
    }

    if (serviceValue < 0 || serviceValue != Number) {
        serviceValue = 0
    }

    console.log(serviceImage)
    console.log(serviceName)
    console.log(serviceDesc)
    console.log(serviceValue)
    console.log(type)
    console.log(categoryID)

    if (isNewImage) {
        uploadImage()
            .then(newImageURL => {
                if (editState) {
                    let uploadImage = null
                    if (serviceImage == item.mainImage) {
                        uploadImage = serviceImage
                    }
                    shouldEditItemWith(serviceID, serviceName, newImageURL, serviceDesc, serviceValue, itemIsVisible)
                } else {
                    // TODO: properly set the isVisible and isPurchasable values
                    shouldCreateItemWith(businessID, imageURL, categoryID, serviceName, serviceDesc, type, serviceValue, parentID, true, itemIsVisible)
                }
            })
    } else {
        if (editState) {
            let uploadImage = null
            if (serviceImage == item.mainImage) {
                uploadImage = serviceImage
            }
            shouldEditItemWith(serviceID, serviceName, imageURL, serviceDesc, serviceValue, itemIsVisible)
        } else {
            // TODO: properly set the isVisible and isPurchasable values
            shouldCreateItemWith(businessID, imageURL, categoryID, serviceName, serviceDesc, type, serviceValue, parentID, true, itemIsVisible)
        }
    }
}

function shouldEditItemWith(itemID, name, mainImage, description, value, itemIsVisible) {
    if (value == null) {
        value = 0
    }
    editItemWith(itemID, name, mainImage, description, value, itemIsVisible)
        .then(data => {
            showToast("Service updated", document.querySelector("body"));
            enableSaveButton(false)
        }).catch(error => {
            window.alert(error)
        })
    setOperatingHoursIfNeeded()
}

function shouldCreateItemWith(businessID, image, catID, name, desc, type, value, parentID, isPurchasable, isVisible) {
    if (value == null) {
        value = 0
    }
    createItem(businessID, image, catID, name, desc, type, value, parentID, isPurchasable, isVisible)
        .then(data => {
            serviceID = data.data.createItem.id
            getItem(serviceID)
            showToast("Service created", document.querySelector("body"));
            showAdditionalFields(true)
            enableEditingState(true)
            enableSaveButton(false)
            createOperatingTable()
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

function getChildrenItems(itemIDs) {
    console.log("item ID's from item", itemIDs)
    if (itemIDs == null || itemIDs.length == 0) {
        return
    }
    fetchItemsForIDs(itemIDs)
        .then(items => {
            console.log("Related items found:", items)
            updateRelatedItemsButtonTitleWithCount(items.length)
            populateAdditionalItemsTable(items)
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteChildItemTapped(event, item, row) {
    console.log('Delete item with ID:', item.id);
    didTapDeleteChildItem(item.id, row)
}

function editItem(event, item) {
    console.log('Edit item with ID:', item, item.type);
    switch (item.type) {
        case "service":
            openEditServiceView(item.id)
            break
        case "product":
            openEditProductView(item.id)
            break
    }
}

function didTapDeleteChildItem(childID, row) {
    console.log("found this row", row)
    console.log("with this Item ID", childID)
    if (confirm("Are you sure you want to delete this product?")) {
        deleteChildItemFromParent(item.id, childID).then(result => {
            console.log(result)
            item = result
            imageURL = item.mainImage
            resetRelatedItemsTable()
            getChildrenItems(item.childrenIDs)
            // row.remove();
        })
    }
}

// Mark: networking

function getOperatingHours() {
    getOperatingHoursForService(item.id)
    .then(data => {
        console.log("operating times", data)
        populateOperatingHours(data)
    })
}

function deleteItem() {
    if (confirm("Are you sure you want to delete this product?")) {
        console.log("deleting item with id", item.id)
        deleteItemWithID(item.id)
            .then(response => {
                window.history.back()
            })
            .catch(error => {
                window.alert(error)
            })
    }
}

function freezeService(event) {
    console.log("freeze status now", item.isVisible)
    freezeItem(item.id, item.isVisible)
        .then(data => {
            console.log("freeze status after", !item.isVisible)
            item.isVisible = !item.isVisible
            enableFreezeServiceButton(true)
        })
        .catch(error => {
            window.alert(error)
        })
}

function getOperatingHoursInput() {
    const table = document.querySelector('.operating-table')
    let operatingHours = []
    days.forEach((day, index) => {
        const isOpen = table.querySelector(`#is-open_${index}`).checked
        const fromTime = table.querySelector(`#from_time_${index}`).value
        const toTime = table.querySelector(`#to_time_${index}`).value
        let operatingHour = new OperatingHour(day, isOpen, fromTime, toTime)
        operatingHours.push(operatingHour)
    })

    console.log("operatingHours:", operatingHours)

    return operatingHours
}

function setOperatingHoursIfNeeded() {

    let operatingHours = getOperatingHoursInput()
    let operatingHoursInput = []

    operatingHours.forEach((operatingHours, index) => {
        let input = {
            itemID: item.id,
            dayOfWeek: operatingHours.day,
            isOpen: operatingHours.isOpen,
            startTime: operatingHours.fromTime,
            endTime: operatingHours.toTime
        }

        operatingHoursInput.push(input)
    })

    if (operatingHoursInput.length > 0) {
        insertOperatingHours(operatingHoursInput)
        .then(data => {
            getOperatingHours(item.id)
        })
    }
}