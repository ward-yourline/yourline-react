const businessImageID = "business_image"
const nameID = "business_name"
const addressID = "business_address"
const emailID = "business_email"
const phoneID = "phone_number"

let isNewImage = false
let imageURL = null

function initialise() {

    enableSaveButton(false)

    createFields()

    imageInput = document.getElementById("imageFile");
    selectedImage = document.getElementById("business_image"); // Define this element

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        console.log("||***********")

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                selectedImage.src = event.target.result;
                selectedImage.style.display = "block";

                const backgroundImage = `url('${event.target.result}')`;
                const imageDiv = document.getElementById("business_image"); // Use the correct field ID
                imageDiv.style.backgroundImage = backgroundImage;
            };

            reader.readAsDataURL(file);
            isNewImage = true
        } else {
            selectedImage.src = "";
            selectedImage.style.display = "none";

            const imageDiv = document.getElementById("business_image"); // Use the correct field ID
            imageDiv.style.backgroundImage = "none";
            isNewImage = false
        }
        enableSaveButton(true)
    });
}

function uploadImage() {
    const form = document.querySelector('#imageForm'); // Use the form's FormData object

    if (form) {
        return uploadImageFromForm(form)
            .then(response => {
                console.log("Image uploaded successfully:", response);
                // Perform any additional actions here after successful upload
                imageURL = response;
                return response
            })
            .catch(error => {
                console.error("Image upload error:", error);
                // Handle error if needed
            });
    } else {
        console.log("Image form not found.");
    }

    return new Promise(function (resolve, reject) {
        reject(false)
    })
}

function createFields() {
    let cells = document.querySelector('.cells')

    imageField = createImageField(businessImageID, "Company logo", "../../../assets/product_placeholder.jpeg")
    nameField = createTextField(nameID, "Business name", "Enter a name")
    addressField = createTextField(addressID, "Business address", "Enter an address")
    email = createTextField(emailID, "Business email", "Enter an email")
    phoneNumberField = createNumericField(phoneID, "Phone number", "Enter business phone number")

    cells.appendChild(imageField)
    cells.appendChild(nameField)
    cells.appendChild(email)
    cells.appendChild(addressField)
    cells.appendChild(phoneNumberField)
}

function createTextField(id, name, placeholder) {
    let cell = document.createElement('div')
    cell.classList.add("cell")
    cell.innerHTML = `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                    <div style="
                    display: flex; 
                    flex-direction: 
                    row; gap: 40px; 
                    justify-content: space-between; 
                    width: 100%; 
                    padding: 20px;
                    ">
                        <div style="width: 100%;">
                            <h3 style="margin-block: 0px; margin-bottom: 10px">${name}</h3>
                            <input id='${id}'
                            style="width: 100%; height: 40px; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 10px; padding-inline: 20px;" 
                            placeholder="${placeholder}" type="text" required"
                            oninput="enableSaveButton(true)"
                            >
                        </div>
                    </div>
                </span>
            `
    return cell
}

function createNumericField(id, name, placeholder) {
    let cell = document.createElement('div')
    cell.classList.add("cell")
    cell.innerHTML = `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                    <div style="
                    display: flex; 
                    flex-direction: 
                    row; gap: 40px; 
                    justify-content: space-between; 
                    width: 100%; 
                    padding: 20px;
                    ">
                        <div style="width: 100%;">
                            <h3 style="margin-block: 0px; margin-bottom: 10px">${name}</h3>
                            <input id='${id}' 
                            style="width: 100%; height: 40px; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 10px; padding-inline: 20px;" 
                            placeholder="${placeholder}" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required"
                            oninput="enableSaveButton(true)"
                            />
                        </div>
                    </div>
                </span>
            `
    return cell
}

function createImageField(id, name, imageURL) {
    let cell = document.createElement('div')
    console.log(imageURL)
    cell.innerHTML =
        `
                <span style="display: flex; flex-direction: row; gap: 40px; width: 100%;">
                        <div style="
                        display: flex; 
                        flex-direction: 
                        row; gap: 40px; 
                        justify-content: space-between; 
                        width: 100%; 
                        padding: 20px;
                        ">
                            <div style="width: 100%; overflow: hidden; max-width: 100%;">
                                <h3 style="margin-block: 0px; margin-bottom: 10px">${name}</h3>
                                <div id='${id}' style="
                                    max-width: 100%;
                                    height: auto;
                                    aspect-ratio: 16/12;
                                    background-position: center;
                                    background-repeat: no-repeat;
                                    background-size: contain;
                                    background-image: url('${imageURL}');
                        ">
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 10px">
                    <form id="imageForm" method="post" enctype="multipart/form-data" onsubmit="didTapUploadImageButton(event); return false;">
                        <div style="display: flex; flex-direction: column">
                             <label for="file">Add an image</label>
                             <input id="imageFile" name="file" type="file" />
                        </div>
                    </form>
                    </div>
                </div>
                        </div>
                    </div>
                </span>
            `
    return cell
}

function enableSaveButton(enabled) {
    let saveButton = document.querySelector('.save-button')

    console.log(enabled ? "enabled" : "disabled")

    if (enabled) {
        saveButton.disabled = false
        saveButton.style.backgroundColor = '3b5e69'
        saveButton.style.opacity = 1.0
    } else {
        saveButton.disabled = true
        saveButton.style.backgroundColor = 'gray'
        saveButton.style.opacity = 0.3
    }
}

function save() {
    const userID = localStorage.getItem("user_id")
    const name = document.querySelector(`#${nameID}`).value.trim()
    const address = document.querySelector(`#${addressID}`).value.trim()
    const email = document.querySelector(`#${emailID}`).value.trim()
    const phoneNumber = document.querySelector(`#${phoneID}`).value.trim()

    console.log(userID, name, address, phoneNumber, email, imageURL)

    if (userID.length == 0 || name.length == 0) {
        alert("A mandatory field is missing")
        return
    }

    if (isNewImage) {
        uploadImage()
            .then(logo => {
                // !!! Broken: ImageURL should logo !!!
                createBusiness(userID, name, address, phoneNumber, email, imageURL) 
                    .then(res => {
                        showToast("Service updated", document.querySelector("body"));
                    })
            })
    } else {
        createBusiness(userID, name, address, phoneNumber, email, imageURL) 
            .then(res => {
                showToast("Service updated", document.querySelector("body"));
            })
    }
}

function finish() {
    window.history.back()
}

function deleteBusiness() {
    // TODO
    //  deleteBusiness(id) 
}