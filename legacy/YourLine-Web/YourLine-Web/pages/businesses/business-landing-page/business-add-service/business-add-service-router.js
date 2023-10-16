function openEditProductView(id) {
    let url = `../business-add-product.html?productID=${id}&categoryID=${categoryID}`
    window.location.href = url;
}

function openEditServiceView(id) {
    let url = `business-add-service.html?serviceID=${id}&categoryID=${categoryID}`
    window.location.href = url;
}

function didTapAddProduct(event) {
    openAddProductView()
}

function didTapAddService(event) {
    openAddServiceView()
}

function openAddProductView() {
    let url = `../business-add-product.html?parent_id=${item.id}&business_id=${businessID}`
    window.location.href = url;
}

function openAddServiceView() {
    let url = `business-add-service.html?parent_id=${item.id}&business_id=${businessID}`
    window.location.href = url;
}

function showItem(item) {
    let url = ""
    switch (item.type) {
        case "product":
            url = `../../../customer/customer-item-details/customer-item-details-page.html?id=${encodeURIComponent(item.id)}&state=preview`;
            break
        case "service":
            url = `../../../customer/customer-item-details/customer-service-details.html?id=${encodeURIComponent(item.id)}`;
            break

    }
    window.location.href = url;
}
