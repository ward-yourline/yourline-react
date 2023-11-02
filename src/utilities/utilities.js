// Helper methods
export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function showError(error, methodName) {
    console.log("Error occurred in: " + methodName, error);

    const errorMessage =
        error.message || "There was an. Please try again.";
    window.alert(errorMessage);
    return error
}

// MARK: URL parameters helper
export function getParameterFromUrl(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}