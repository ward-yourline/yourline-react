let fields = [
    { id: "service_image", name: "Image", type: FieldType.IMAGE, placeholder: "Add a main image for your service ...", resource: "../../../assets/service_placeholder.jpeg" },
    { id: "service_name", name: "Service name *", type: FieldType.TEXT, placeholder: "Add a name for your service ...", resource: "" },
    { id: "service_desc", name: "Description *", type: FieldType.TEXT, placeholder: "Add a description for your service ...", resource: "" },
    { id: "service_value", name: "Value (£) *", type: FieldType.NUMERIC, placeholder: "Add the price for your service ...", resource: "" }
]

function setUIForEditState(editEnabled) {
    let submitButton = document.querySelector('.save-button')
    let titleLabel = document.querySelector('.title-label')

    if (editEnabled) {
        editState = editEnabled
        submitButton.textContent = "Save Changes"
        titleLabel.textContent = "Edit Service"
    } else {
        submitButton.textContent = "Add Service"
        titleLabel.textContent = "Add Service"
    }
}

function populateOperatingHours(hours) {
    const table = document.querySelector('.operating-table')

    hours.forEach((hour, index) => {
        const day = hour.dayOfWeek
        const fromTime = convertISOTimeToHHMM(hour.startTime)
        const toTime = convertISOTimeToHHMM(hour.endTime)
        const isOpen = hour.isOpen

        const isOpenInput = table.querySelector(`#is-open_${index}`)
        const fromTimeInput = table.querySelector(`#from_time_${index}`)
        const toTimeInput = table.querySelector(`#to_time_${index}`)

        isOpenInput.checked = isOpen
        fromTimeInput.value = fromTime
        toTimeInput.value = toTime

        fromTimeInput.disabled = !isOpen;
        toTimeInput.disabled = !isOpen;
    })
}

function createOperatingTable() {
    const tableDiv = document.querySelector('.operating-management')
    tableDiv.style.display = "block"
    const table = document.querySelector('.operating-table')

    days.forEach((day, index) => {
        const row = document.createElement('tr')
        const dayCell = document.createElement('td')
        const timeCell = document.createElement('td')
        const openCell = document.createElement('td')
        const fromTimeInput = document.createElement('input')
        const toTimeInput = document.createElement('input')
        const openCheckbox = document.createElement('input')

        const timeDiv = document.createElement('div')

        dayCell.style.display = "flex"
        dayCell.style.flexDirection = "row"
        dayCell.style.alignItems = "center"

        timeDiv.style.display = "flex"
        timeDiv.style.flexDirection = "row"
        timeDiv.style.alignItems = "center"
        timeDiv.style.padding = 0

        openCheckbox.type = "checkbox"
        openCheckbox.id = `is-open_${index}`

        fromTimeInput.style.height = "100%"
        fromTimeInput.type = "time"
        fromTimeInput.id = `from_time_${index}`
        fromTimeInput.style.margin = "5px"

        toTimeInput.style.height = "100%"
        toTimeInput.style.margin = "5px"
        toTimeInput.type = "time"
        toTimeInput.id = `to_time_${index}`

        openCheckbox.addEventListener("change", function () {
            enableSaveButton(true);
            fromTimeInput.disabled = !openCheckbox.checked;
            toTimeInput.disabled = !openCheckbox.checked;
            fromTimeInput.value = toTimeInput.value = "00:00";
        });

        fromTimeInput.addEventListener("change", () => {
            enableSaveButton(true);
        });

        toTimeInput.addEventListener("change", () => {
            enableSaveButton(true);
        });

        const fromLabel = document.createElement('label')
        const toLabel = document.createElement('label')
        fromLabel.textContent = "Open: "
        toLabel.textContent = " Close: "
        timeDiv.appendChild(fromLabel)
        timeDiv.appendChild(fromTimeInput)
        timeDiv.appendChild(toLabel)
        timeDiv.appendChild(toTimeInput)

        dayCell.innerHTML = `<h4 style="height: 100%">${day}</h4>`
        timeCell.appendChild(timeDiv)
        openCell.appendChild(openCheckbox)

        row.appendChild(dayCell)
        row.appendChild(timeCell)
        row.appendChild(openCell)

        table.appendChild(row)
    })
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

    fields.forEach(field => {

        var cell = undefined

        switch (field.type) {
            case FieldType.IMAGE:
                cell = createImageField(field, item.mainImage)
                break
            case FieldType.TEXT:
                let textValue = null
                if (field.id == "service_name") {
                    textValue = name
                }
                if (field.id == "service_desc") {
                    textValue = desc
                }
                cell = createTextField(field, textValue)
                break
            case FieldType.NUMERIC:
                let numericValue = null
                if (field.id == "service_value") {
                    numericValue = price
                }
                cell = createNumericField(field, numericValue)
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

function createNumericField(field, value) {
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
                            placeholder="${field.placeholder}" step="0.01" type="number" required value="${value}"
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
                        <div style="display: flex; flex-direction: column">
                             <label for="file">Add an image</label>
                             <input id="imageFile" name="file" type="file" />
                        </div>
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

function showAdditionalFields(show) {
    const additionalItemsDiv = document.querySelector('.additional-items-div')
    additionalItemsDiv.style.display = show ? "flex" : "none"
}

function populateAdditionalItemsTable(items) {
    const table = document.querySelector('.additional-items-table').querySelector('tbody')
    items.forEach(childItem => {
        let row = document.createElement('tr')
        row.style.cursor = "pointer"
        row.setAttribute("item_id", childItem.id)

        let stock = ""

        if (childItem.type == "service") {
            stock = "n/a"
        } else {
            stock = childItem.stock == null ? "0" : childItem.stock
        }

        let rowData = `
        <td style="display: flex; justify-content: center; align-items: center;">
            <div class="image-preview" style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                width: 50px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center; 
            "></div>
        </td>
        <td>${childItem.name}</td>
        <td>${childItem.description}</td>
        <td>${childItem.value}</td>
        <td>${stock}</td>
        <td>
            <div style="display: flex; flex-direction: row; justify-content: center;"> 
                <button class="tappable-button edit-item-button">Edit</button>
                <button class="button-style-remove delete-item-button">Delete</button>
            </div>
        </td>
    `;

        row.innerHTML = rowData
        let imagePreview = row.querySelector('.image-preview')
        imagePreview.style.backgroundImage = `url('${childItem.mainImage}')`
        let deleteButton = row.querySelector('.delete-item-button')

        deleteButton.addEventListener('click', event => {
            event.stopPropagation()
            deleteChildItemTapped(event, childItem, row)
        })

        let editButton = row.querySelector('.edit-item-button')
        editButton.addEventListener('click', event => {
            event.stopPropagation()
            editItem(event, childItem)
        })

        row.addEventListener('click', event => {
            event.stopPropagation()
            showItem(childItem)
        })
        table.append(row)
    })
}

function updateRelatedItemsButtonTitleWithCount(count) {
    const relatedItemsButton = document.querySelector('.related-items-button')
    relatedItemsButton.textContent = "Related items" + `(${count})`
}

function resetRelatedItemsTable() {
    const table = document.querySelector('.additional-items-table').querySelector('tbody');

    // Set the innerHTML of the table's tbody to an empty string
    table.innerHTML = '';
}


function enableEditingState(enabled) {
    enableFreezeServiceButton(enabled)
    enableDeleteButton(enabled)
}

function enableFreezeServiceButton(enabled) {
    const freezeServiceButton = document.querySelector('.freeze-service')
    const freezeStatusLabel = document.querySelector('.freeze-status')

    freezeServiceButton.style.display = enabled ? 'block' : 'none'
    if (item != null) {
        freezeServiceButton.textContent = item.isVisible ? "Freeze service" : "Unfreeze service"
        const frozenTitle = "This service is frozen and cannot be seen by customers"
        const liveTitle = "This service is live and can be seen by customers"
        freezeStatusLabel.textContent = item.isVisible ? liveTitle : frozenTitle
        freezeStatusLabel.style.color = item.isVisible ? 'green' : 'red'
    }
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

function enableDeleteButton(enabled) {
    deleteButton.style.display = enabled ? 'block' : 'none'
}
