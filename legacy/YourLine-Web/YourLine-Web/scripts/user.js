
function getUserID() {
    let userID = localStorage.getItem("user_id")
    console.log("UserID:", userID)

    return userID
}

function getBusinessID() {
    let businessID = localStorage.getItem("business_id")
    console.log("businessID:", businessID)

    return businessID
}
