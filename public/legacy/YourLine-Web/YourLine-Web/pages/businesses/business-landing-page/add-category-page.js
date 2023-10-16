// Add event listener to "add" buttons
document.getElementById('add1').addEventListener('click', addItemToList);

// Function to add item to list
function addItemToList(event) {
    // Get input and list elements
    const inputId = event.target.id.replace('add', 'input');
    const listId = 'list' + inputId.substr(-1);
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);


    if (input.value === "") {
        return
    }

    const inputValue = input.value.charAt(0).toUpperCase() + input.value.slice(1);

    // Create new list item
    const listItem = document.createElement('div');
    const listItemDiv = document.createElement('div');

    listItem.style.cssText = 'width:100%;margin-bottom:20px';

    listItemDiv.style.cssText = 'width:100%; display:flex;';
    listItem.textContent = inputValue

    // Add delete button to list item
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("destructive-button");
    deleteButton.innerHTML = '<img class="delete-button-image" src="../../assets/delete_FILL0_wght400_GRAD0_opsz48.svg" />'
    deleteButton.style.cssText = 'width:20%;padding-bottom:10px';

    const editButton = document.createElement('button')
    editButton.textContent = "Edit category"
    editButton.style.cssText = 'padding:0;width:80%;margin-bottom:10px;background-color: white;border:none;cursor:pointer;text-decoration:underline;text-align:left;color:cadetblue';

    editButton.addEventListener('click', () => {
        const newText = prompt('Enter new text:', "");
        if (newText !== null && newText.trim() !== '') {
            listItemDiv.parentElement.firstChild.textContent = newText.charAt(0).toUpperCase() + newText.slice(1);
        }
    });

    deleteButton.addEventListener('click', function () {
        list.removeChild(listItem);
    });

    editButton.addEventListener('click', () => {
        const newText = prompt('Enter new text:', text);
        if (newText !== null && newText.trim() !== '') {
            listItemDiv.parentElement.firstChild.textContent = newText.charAt(0).toUpperCase() + newText.slice(1);
        }
    });

    listItemDiv.append(editButton)
    listItemDiv.append(deleteButton)

    listItem.append(listItemDiv)

    // Add list item to list
    list.appendChild(listItem);

    // Clear input field
    input.value = '';
}

const submitButton = document.querySelector('.industry-submit');
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // TODO: Send categories via mutation, wait for completion, then go back. Might need an activity spinner here

    window.history.back()
});

function redirectToNextPage() {
    const businessID = "123"; // Replace with your dynamic value
    const url = "/next-page?business_id=" + encodeURIComponent(businessID);
    window.location.href = url;
}