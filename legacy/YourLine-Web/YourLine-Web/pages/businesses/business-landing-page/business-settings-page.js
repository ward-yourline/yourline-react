let user
const defaultImage = '../../../assets/product_placeholder.jpeg'
isNewImage = false

function onload() {

    initialise()
    subsribeToImageInput()
}

function initialise() {
    const userID = getUserID()
    const deleteButton = document.querySelector('.delete-account-button')
    const uploadButton = document.querySelector('.add-image-button')

    getUser(userID)

    deleteButton.addEventListener('click', event => {
        deleteUserAccount(userID)
    })

    uploadButton.addEventListener('click', event => {
        const imageInput = document.getElementById("imageFile");
        imageInput.click()
    })
}

function subsribeToImageInput() {

    imageInput = document.getElementById("imageFile");
    selectedImage = document.getElementById("user_image"); // Define this element

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        console.log("***********", file)

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                selectedImage.src = event.target.result;
                selectedImage.style.display = "block";

                const backgroundImage = `url('${event.target.result}')`;
                selectedImage.style.backgroundImage = backgroundImage;
            };

            reader.readAsDataURL(file);
            isNewImage = true
        } else {
            selectedImage.src = "";
            selectedImage.style.display = "none";

            const imageDiv = document.getElementById(field.id); // Use the correct field ID
            imageDiv.style.backgroundImage = "none";
            isNewImage = false
        }
        enableSaveButton(true)
    });
}

function getUser(userID) {

    console.log("**** getUser() called ****")
    console.log("id:", userID)

    fetchUserForID(userID)
        .then(data => {
            console.log(data)
            user = data

            const email = data.email
            const username = data.username
            const imageURL = data.userImage
            const accountType = data.accountType
            const address = data.address
            const postCode = data.postCode
            const telephoneNumber = data.telephoneNumber

            const userEmailLabel = document.querySelector('#user_email')
            const usernameLabel = document.querySelector('#username')
            const addressLabel = document.querySelector('#address')
            const phoneLabel = document.querySelector('#telephone_number')
            const postCodeLabel = document.querySelector('#post_code')

            userEmailLabel.textContent = email
            usernameLabel.textContent = username
            addressLabel.value = address
            postCodeLabel.value = postCode
            phoneLabel.value = telephoneNumber
            let userImageDiv = document.querySelector('#user_image')

            userImageDiv.style.backgroundImage = `url(${imageURL == null ? defaultImage : imageURL})`;
        })
}

function didTapUploadImageButton() {
    let form = document.querySelector('#imageForm')

    uploadImageFromForm(form)
        .then(data => {
            console.log(data)
            showToast("Image saved", document.querySelector("body"));
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

function save() {
    const addressLabel = document.querySelector('#address')
    const phoneLabel = document.querySelector('#telephone_number')
    const postCodeLabel = document.querySelector('#post_code')

    const userID = user.id
    const address = addressLabel.value
    const postCode = postCodeLabel.value
    const telephoneNumber = phoneLabel.value

    if (isNewImage) {
        let form = document.querySelector('#imageForm')
        uploadImageFromForm(form)
        .then(newImageURL => {
            updateUserDetails(userID, newImageURL, address, postCode, telephoneNumber)
            .then(data => {
                showToast("Image saved", document.querySelector("body"));
            })
        })
        isNewImage = false
    } else {
        updateUserDetails(userID, null, address, postCode, telephoneNumber)
            .then(data => {
                showToast("Updates saved", document.querySelector("body"));
            })
    }
}

function enableSaveButton(enabled) {

}