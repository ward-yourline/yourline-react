const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../customer-home-page/customer-home-page.html';
});