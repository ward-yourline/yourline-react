function onload() {
    console.log("loaded")
    let userID = getUserID()
    getBusinessesForUserID(userID)
}

function reloadTableWithBusinesses(businesses) {
    const table = document.querySelector('.table-messages')

    businesses.forEach(data => {
        const business = new Business(data)
        const row = document.createElement('tr')

        const itemField = document.createElement('td')
        const dateField = document.createElement('td')

        dateField.style.textAlign = 'right'

        itemField.innerHTML = `<p style="font-weight: 600">${business.name}</p>`
        dateField.textContent = formatISODateTime(business.createdDate)
        // let statusClass = ""
        // switch (business.transactionStatus) {
        //     case "incomplete":
        //         statusClass = "status-incomplete"
        //         break
        //     case "completed":
        //         statusClass = "status-completed"
        //         break
        //     case "pending":
        //         statusClass = "status-pending"
        //         break
        //     case "canceled":
        //         statusClass = "status-canceled"
        //         break
        // }
        // statusField.innerHTML = `<p class="${statusClass}">${business.transactionStatus}</p>`

        row.appendChild(itemField)
        row.appendChild(dateField)

        table.appendChild(row)

        row.addEventListener('click', event => {
            event.stopPropagation()
            openBusiness(business)
        })
    })
}

function getBusinessesForUserID(userID) {
    fetchBusinessesForUserID(userID)
        .then(businesses => {
            console.log("onLoad data retrieved:", businesses);
            console.log("business ID:", businesses);
            reloadTableWithBusinesses(businesses);
        })
        .catch(error => {
            window.alert(error);
        });
}

function openBusiness(business) {
    console.log("business id", business.id)
    window.location.href = `business-details.html?business_id=${business.id}`
}

function didTapCreateBusiness(event) {
    window.location.href = `../business-create/business-create.html`
}