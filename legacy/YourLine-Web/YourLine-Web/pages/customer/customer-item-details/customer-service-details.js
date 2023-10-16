const defaultState = "default"
const previewState = "preview"

function onload() {
    let id = getItemIdFromUrl()
    getItemForID(id)
}

function getItemForID(id) {
    fetchItemForID(id)
        .then(service => {
            console.log("Item found", service)
            updateUIWithItem(service)
            getChildrenItems(service.childrenIDs)
        })
}

function updateUIWithItem(service) {
    let nameLabel = document.querySelector('.service-name')
    let descLabel = document.querySelector('.service-desc')
    let serviceImage = document.querySelector('.item-image')

    let serviceName = service.name
    let imageUrl = service.mainImage
    let serviceDesc = service.description

    nameLabel.textContent = serviceName
    descLabel.textContent = serviceDesc
    serviceImage.src = imageUrl

    console.log("Updating service with service", service)
}

// Helper
function getItemIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getChildrenItems(itemIDs) {
    console.log("item ID's from item", itemIDs)
    if (itemIDs.length == 0) {
        return
    }
    fetchItemsForIDs(itemIDs)
        .then(items => {
            console.log("Related items found:", items)
            populateAdditionalItemsTable(items)
        })
        .catch(error => {
            console.log(error)
        })
}

function populateAdditionalItemsTable(items) {
    const table = document.querySelector('.additional-items-table').querySelector('tbody')
    console.log("Found items", items)
    console.log("table rows", table.childNodes)
    items.forEach(childItem => {
        let row = document.createElement('tr')
        row.style.cursor = "pointer"
        row.style.height = "100px"
        let rowData = `
        <td style="display: flex; justify-content: start; align-items: center; width:15%">
            <div>
                <div class="image-preview" style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    width: 100px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center center; 
                    background-image: url('${childItem.mainImage}');
                "></div>
            </div>
        </td>
        <td style="width:15%">${childItem.name}</td>
        <td style="width:60%">${childItem.description}</td>
        <td style="width:10%">£${childItem.value}</td>
    `;

        row.innerHTML = rowData
        row.addEventListener('click', event => {
            event.stopPropagation()
            showItem(childItem)
        })
        table.append(row)
    })
}

function showItem(item) {
    console.log("showing item", item)
    var url = ``
    switch(item.type) {
        case "product":
            url = `../customer-item-details/customer-item-details-page.html?id=${encodeURIComponent(item.id)}`;
            break
        case "service":
            url = `../customer-item-details/customer-service-details.html?id=${encodeURIComponent(item.id)}`;
            break
    }

    window.location = url
}