// Function to create a new list item and add it to the list
function addListItem(list, text) {
    const listItem = document.createElement('div');
    listItem.style.cssText = 'width:100%;margin-bottom:20px';
    const label = document.createElement('label');
    label.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    listItem.appendChild(label)
    listItem.append(createListItemDiv(text));
    list.appendChild(listItem);
}

// Function to create a new list item div
function createListItemDiv(text) {
    const listItemDiv = document.createElement('div');
    listItemDiv.style.cssText = 'width:100%; display:flex;';

    const editButton = document.createElement('button')
    editButton.textContent = "Edit name"
    editButton.style.cssText = 'padding:0;width:80%;margin-bottom:10px;background-color: white;border:none;cursor:pointer;text-decoration:underline;text-align:left;color:cadetblue';

    editButton.addEventListener('click', () => {
        const newText = prompt('Enter new text:', text);
        if (newText !== null && newText.trim() !== '') {
            listItemDiv.parentElement.firstChild.textContent = newText.charAt(0).toUpperCase() + newText.slice(1);
        }
    });

    listItemDiv.append(editButton);
    listItemDiv.append(createDeleteButton());

    return listItemDiv;
}

// Function to create a delete button for a list item
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("destructive-button");
    deleteButton.innerHTML = '<img class="delete-button-image" src="../../../assets/delete_FILL0_wght400_GRAD0_opsz48.svg" />'
    deleteButton.style.cssText = 'width:20%;padding-bottom:10px';

    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.parentNode.parentNode;
        const list = listItem.parentNode;
        list.removeChild(listItem);
    });

    return deleteButton;
}

// Function to handle the "Add" button click event
function handleAddButtonClick(event) {
    const inputId = event.target.id.replace('add', 'input');
    const listId = 'list' + inputId.substr(-1);
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    if (input.value === "") {
        return;
    }

    addListItem(list, input.value);
    input.value = '';
}

// Add click event listeners to "Add" buttons
const addButton1 = document.getElementById('add1');
addButton1.addEventListener('click', handleAddButtonClick);

const addButton2 = document.getElementById('add2');
addButton2.addEventListener('click', handleAddButtonClick);

const submitButton = document.querySelector('.industry-submit');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const indusriesList = document.getElementById('list1');
    const secotorsList = document.getElementById('list2');

    const industriesDivs = indusriesList.querySelectorAll('.list label');
    const sectorsDivs = secotorsList.querySelectorAll('.list label');

    const divs = document.querySelectorAll('.list label');

    const industriesArray = [];
    const sectorsArray = [];

    for (let i = 0; i < industriesDivs.length; i++) {
        const textContent = industriesDivs[i].textContent;
        industriesArray.push(textContent);
    }

    for (let i = 0; i < sectorsDivs.length; i++) {
        const textContent = sectorsDivs[i].textContent;
        sectorsArray.push(textContent);
    }

    const industriesData = { industriesArray: industriesArray };
    const sectorsData = { sectorsArray: sectorsArray };

    console.log("Indusries");
    console.log(industriesData);

    console.log("Sectors");
    console.log(sectorsData);

    let businessID = localStorage.getItem("business_id");


    addIndustryToBusiness(businessID, industriesData.industriesArray)
    addSectorToBusiness(businessID, sectorsData.sectorsArray)

    const addIndustryPromise = addIndustryToBusiness(businessID, industriesData.industriesArray);
    const addSectorPromise = addSectorToBusiness(businessID, sectorsData.sectorsArray);

    Promise.all([addIndustryPromise, addSectorPromise]).then(() => {
        // Both promises have resolved
        // Open the next page
    }).catch((error) => {
        // At least one promise has rejected
        console.error(error);
    });

    Promise.all([addIndustryPromise, addSectorPromise])
        .then(() => {
            // Both functions have completed successfully, you can now proceed to the next page
            window.location.href = './business-profile-completed.html'
        })
        .catch(error => {
            // At least one of the functions has failed
            console.error(error);
        });

    console.log("this is called");
});
