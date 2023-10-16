function showItem(item) {
    console.log("showing item", item)
    var url = ``
    switch (item.type) {
        case "product":
            url = `../customer-item-details/customer-item-details-page.html?id=${encodeURIComponent(item.id)}`;
            break
        case "service":
            url = `../customer-item-details/customer-service-details.html?id=${encodeURIComponent(item.id)}`;
            break
    }

    window.location = url
}