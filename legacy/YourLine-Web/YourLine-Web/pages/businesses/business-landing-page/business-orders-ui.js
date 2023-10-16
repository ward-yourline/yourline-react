function reloadTableWithBusinesses(orders) {
    const table = document.querySelector('.table-messages')

    orders.forEach(order => {
        console.log("order", order)
        const row = document.createElement('tr')

        const itemField = document.createElement('td')
        const customerField = document.createElement('td')
        const timeField = document.createElement('td')
        const statusField = document.createElement('td')

        itemField.innerHTML = `<p style="font-weight: 600">${order.itemName}</p>`
        customerField.textContent = "John Smith"
        timeField.textContent = formatISODateTime(order.createdDate)
        let statusClass = ""
        switch (order.transactionStatus) {
            case "incomplete":
                statusClass = "status-incomplete"
                break
            case "completed":
                statusClass = "status-completed"
                break
            case "pending":
                statusClass = "status-pending"
                break
            case "canceled":
                statusClass = "status-canceled"
                break
        }
        statusField.innerHTML = `<p class="${statusClass}">${order.transactionStatus}</p>`

        row.appendChild(itemField)
        row.appendChild(customerField)
        row.appendChild(timeField)
        row.appendChild(statusField)

        table.appendChild(row)

        row.addEventListener('click', event => {
            event.stopPropagation()
            openOrder(order)
        })
    })
}