let state = null
let businessID = null

function onload() {
    let titleLabel = document.querySelector('.title-label')
    let addButton = document.querySelector('.add-button')
    let tableLabel = document.querySelector('.table-type-label')

    businessID = getBusinessID()
    state = getParameterFromUrl('state')

    let itemType = null

    switch (state) {
        case "services":
            itemType = "service"
            titleLabel.textContent = "Your Services"
            break
        case "products":
            itemType = "product"
            titleLabel.textContent = "Your Products"
            break
    }

    fetchItemsForBusinessID(businessID, itemType)
        .then(items => {
            console.log(items)
            items.forEach(item => {
                let name = item.name
                let description = item.description
                let price = item.value
                let image = item.mainImage
                let id = item.id

                console.log(name, price, description)
                let table = document.querySelector(".products-table")
                let row = createProductTableRow(item)
                table.appendChild(row)
            })
        })
}

function openEditProductView(id) {
    let url = `./business-add-product.html?productID=${id}&business_id=${businessID}`
    window.location.href = url;
}

function openEditServiceView(id) {
    let url = `./business-add-service/business-add-service.html?serviceID=${id}&business_id=${businessID}`
    window.location.href = url;
}

function openAddProductView() {
    let url = `./business-add-service/business-add-product.html?business_id=${businessID}`
    window.location.href = url;
}

function openAddServiceView() {
    let url = `./business-add-service/business-add-service.html?business_id=${businessID}`
    window.location.href = url;
}

function getBusinessID() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessID = urlParams.get("business_id");
    console.log("businessID:", businessID);
    return businessID
}

function createProductTableRow(item) {
    const tr = document.createElement('tr');
    let formattedPrice = formatCurrency(item.value)

    tr.innerHTML = `
    <td style="padding-left: 20px; padding-right:20px;">
        <span style="display: flex; flex-direction: column; justify-content: start;">
            <div class="product-image">
            <img src=${item.mainImage} alt="">
            </div>
            <div class="tappable-button" style="text-align: center; width:100px">${item.name}</div>
        </span>
    </td>
    <td>${item.description}</td>
    <td>${formattedPrice}</td>
    <td style="color: ${item.isVisible ? "green" : "tomato"}; font-weight: 600;" >${item.isVisible ? "Live" : "Frozen"}</td>

    <td>
        <div style="display: flex;">
            <div style="width: auto; display: inline-block; margin-right: 10px;">
                <div class="grid-item tappable-button edit-product">Edit</div>
            </div>
            <div style="width: 1px; color: #3b5e69;background-color: #3b5e69; opacity: 0.2;"></div>
            <div style="width: auto; display: inline-block; margin-left:10px">
                <div class="grid-item tappable-delete-button delete-product-button">Delete</div>
            </div>
        </div>
    </td>
`;

    tr.setAttribute(kItemID, item.id)

    const editButton = tr.querySelector('.edit-product');
    editButton.addEventListener('click', event => {
        event.stopPropagation()

        let itemID = editButton.closest('tr').getAttribute(kItemID)
        console.log(state)
        switch (state) {
            case "products":
                openEditProductView(itemID)
                break
            case "services":
                openEditServiceView(itemID)
                break
        }
    });

    const deleteButton = tr.querySelector('.delete-product-button');
    deleteButton.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()
        let productID = deleteButton.closest('tr').getAttribute(kItemID)
        console.log(productID)
        didTapDeleteProduct(productID, deleteButton)
    });

    tr.setAttribute(kItemID, item.id)
    tr.addEventListener(`click`, event => {
        event.stopPropagation()
        showItem(item)
    })
    tr.style.pointer = 'default'
    return tr;
}

function showItem(item) {
    let url = ""
    switch (item.type) {
        case "product":
            url = `../../customer/customer-item-details/customer-item-details-page.html?id=${encodeURIComponent(item.id)}&state=preview`;
            break
        case "service":
            url = `../../customer/customer-item-details/customer-service-details.html?id=${encodeURIComponent(item.id)}`;
            break

    }
    window.location.href = url;
}

function didTapDeleteProduct(productID, element) {
    let tr = element.closest('tr')
    if (confirm("Are you sure you want to delete this product?")) {
        deleteItemWithID(productID).then(data => {
            tr.remove();
        })
    }
}