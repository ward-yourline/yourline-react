// Helper methods
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function parseToken(token) {

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);

    console.log(payload);
    return payload
}

function showError(error, methodName) {
    console.log("Error occurred in: " + methodName, error);

    const errorMessage =
        error.message || "There was an. Please try again.";
    window.alert(errorMessage);
    return error
}

// MARK: Currency
function getUserCurrency() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const countryCode = userLanguage.substring(userLanguage.length - 2).toUpperCase();
    let currencyCode;
  
    // Handle special cases where language and currency codes differ

    switch (countryCode) {
        case "GB":
            return "GBP"
        case "US":
            return "USD"
    }

    currencyCode = countryCode;
  
    return currencyCode;
  }

function formatCurrency(amount) {
    const userCurrency = getUserCurrency();
    const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: userCurrency });
    return formatter.format(amount);
}

// Mark: Time conversions
function convertISOTimeToHHMM(isoTime) {
    if (isoTime == null || isoTime.length == 0) {
        return '00:00';
    }

    const match = isoTime.match(/(\d{2}):(\d{2})/);
    
    if (match) {
        const hours = match[1];
        const minutes = match[2];
        return `${hours}:${minutes}`;
    }
    
    return '00:00'; // Return a default value if the format is invalid
}

function formatISODateTime(isoTime) {
    if (isoTime == null || isoTime.length == 0) {
        return '00:00';
    }

    const match = isoTime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    
    if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hours = match[4];
        const minutes = match[5];
        return `${day}-${month}-${year}, ${hours}:${minutes}`;
    }
    
    return '00:00'; // Return a default value if the format is invalid
}


// MARK: Debouncer
let timeoutId;
function debounce(callback, delay) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
}

// MARK: URL parameters helper
function getParameterFromUrl(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

// MARK: Time and date 
function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}