let businessID = null
let categoryIDSelected
let categoryType = ""

function onLoad() {
    let titleLabel = document.querySelector('.categories-label')
    categoryType = getParameterFromUrl('category_type')
    businessID = getParameterFromUrl("business_id")

    switch (categoryType) {
        case "products":
            titleLabel.textContent = "Product categories"
        break
        case "services":
            titleLabel.textContent = "Service categories"
        break
    }
    
    console.log("state", categoryType)
    getCategories(businessID)
}

function getCategories(businessID) {
    getCategoriesForBusiness(businessID, categoryType)
    .then(data => {
        let tableCategories = document.querySelector('#table-categories')

        tableCategories.innerHTML = `
                    <tr>
                        <th style="width:20%;">Category</th>
                        <th style="width:70%;">Description</th>
                        <th style="width:10%;">Actions</th>
                    </tr>
        `
        console.log(tableCategories)

        data.forEach(category => {
            console.log(category.name)
            addCategoryToTable(category, tableCategories)
        })
    })
}

function addCategoryTapped() {
    let categoryInput = document.querySelector('.name-input')
    let descriptionInput = document.querySelector('.description-input')

    let categoryName = categoryInput.value
    let description = descriptionInput.value

    if (categoryName.trim() === "") {
        alert("Enter a category name")
        return
    }

    if (description.trim() === "") {
        alert("Enter a description")
        return
    }

    categoryInput.value = ""
    descriptionInput.value = ""
    showAddCategoryView(false)
    addCategoryToBusiness(businessID, categoryName, description, categoryType)
        .then(data => {
            return getCategories(businessID)
        })
}

function addCategoryToTable(category, table) {

    // Create table row
    let row = document.createElement('tr');
    row.setAttribute(kCategoryID, category.id)

    // Create table data for name
    let nameData = document.createElement('td');
    nameData.textContent = category.name;
    row.addEventListener('click', event => {
        event.stopPropagation()
        let categoryID = nameData.parentElement.getAttribute(kCategoryID);
        let url = `../business-landing-page/business-products-page.html?categoryID=${categoryID}&category_name=${category.name}&category_type=${categoryType}&business_id=${businessID}`;
        window.location.href = url;
    });

    // Create table data for description
    let descriptionData = document.createElement('td');
    descriptionData.style.fontSize = '12pt'
    descriptionData.textContent = category.description

    // Create table data for actions
    let actionsData = document.createElement('td');

    // Create actions container
    let actionsContainer = document.createElement('div');
    actionsContainer.style.display = 'flex';

    // Create Edit button
    let editButton = document.createElement('div');
    editButton.className = 'grid-item tappable-button';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', event => {
        event.stopPropagation()
        let dialogueBox = document.querySelector('.edit-category-name-dialogue')
        let tr = editButton.closest('tr')

        categoryIDSelected = tr.getAttribute(kCategoryID)

        console.log(categoryIDSelected)
        dialogueBox.showModal()
    });
    actionsContainer.appendChild(editButton);

    // Create separator
    let separator = document.createElement('div');
    separator.style.width = '1px';
    separator.style.color = '#3b5e69';
    separator.style.backgroundColor = '#3b5e69';
    separator.style.opacity = '0.2';
    separator.style.margin = "0 10px 0 10px"
    actionsContainer.appendChild(separator);

    // Create Delete button
    let deleteButton = document.createElement('div');
    deleteButton.className = 'grid-item tappable-delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', event => {
        event.stopPropagation()
        deleteTableRow(deleteButton);
    });
    actionsContainer.appendChild(deleteButton);

    actionsData.appendChild(actionsContainer);

    // Append elements to the table row
    row.appendChild(nameData);
    row.appendChild(descriptionData);
    row.appendChild(actionsData);

    // Append table row to the table
    table.appendChild(row);
}

function deleteTableRow(element) {
    if (confirm("Are you sure you want to delete this category?")) {
        let tr = element.closest('tr')
        console.log(tr)
        let id = tr.getAttribute(kCategoryID)
        console.log(id)

        deleteCategory(id).then(data => {
            tr.remove();
        })
    }
}

function updateCategoryNameForCategory() {
    // TODO
}

function showAddCategoryView(show) {
    const addCategoryView = document.querySelector('.add-category-parent-div');
    addCategoryView.style.display = show ? "flex" : "none";
}