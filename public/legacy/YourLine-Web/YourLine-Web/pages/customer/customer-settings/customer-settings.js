let user

function onload() {
    const userID = getUserID()
    let deleteButton = document.querySelector('.delete-account-button')
    deleteButton.addEventListener('click', event => {
        deleteUserAccount(userID)
    })
    getUser(userID)
}

function getUser(userID) {

    console.log("**** getUser() called ****")
    console.log("id:", userID)

    fetchUserForID(userID)
        .then(data => {
            console.log(data)
            user = data

            let email = data.email
            let username = data.username
            let imageURL = data.userImage
            let accountType = data.accountType
            let address = data.address
            let postCode = data.postCode
            let telephoneNumber = data.telephoneNumber

            let userEmailLabel = document.querySelector('#user_email')
            let usernameLabel = document.querySelector('#username')
            let addressLabel = document.querySelector('#address')
            let phoneLabel = document.querySelector('#telephone_number')

            userEmailLabel.textContent = email
            usernameLabel.textContent = username
            addressLabel.textContent = address + " " + postCode
            phoneLabel.textContent = telephoneNumber
            let userImageDiv = document.querySelector('#user_image')

            addImageToComponent(userImageDiv, imageURL)
        })
}

function deleteUserAccount(userID) {
    if (confirm("Are you sure you want to delete your account? It can't be recovered.")) {
        deleteAccount(userID)
            .then(data => {
                parent.window.location = '../../landing-page/landing-page.html'
                alert("Account deleted")
            })
            .catch(error => {
                alert(error)
            })
    }
}