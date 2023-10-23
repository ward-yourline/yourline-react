function onload() {
    const password = document.querySelector('.password')
    const text = document.getElementById("caps-warning");

    text.style.display = "none"
    password.addEventListener("keyup", function (event) {
        if (event.getModifierState("CapsLock")) {
            text.style.display = "block";
        } else {
            text.style.display = "none"
        }
    });
}

function showPassword(checkbox) {
    const passwordField = document.querySelector('.password')

    if (checkbox.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}


// Sign up

function signUpTapped() {
    const firstName = document.querySelector('.first-name').value
    const surname = document.querySelector('.surname').value
    const email = document.querySelector('.email').value
    const username = document.querySelector('.username').value
    const password = document.querySelector('.password').value
    const address = document.querySelector('.address').value
    const number = document.querySelector('.phone-number').value
    const postCode = document.querySelector('.post-code').value
    const accountType = "standard"

    console.log(accountType)

    if (username.length == 0) {
        alert("Please enter a username");
        return
    }

    if (validateEmail(email) == false || email.length == 0) {
        alert("Please enter a valid email");
        return
    }

    if (password === "") {
        alert("Please enter a valid password (8 charactres min)");
        return
    }

    if (firstName.length == 0) {
        alert("Please enter your first name");
        return
    }

    if (surname.length == 0) {
        alert("Please enter your first last name");
        return
    }

    if (address.length == 0) {
        alert("Please enter your address");
        return
    }

    if (number.length == 0) {
        alert("Please enter your mobile number");
        return
    }

    if (postCode.length == 0) {
        alert("Please enter your postcode");
        return
    }

    console.log(firstName, surname, username, password, address, number)

    signUp(email, username, password, accountType, firstName, surname, password, address, postCode, number)
}