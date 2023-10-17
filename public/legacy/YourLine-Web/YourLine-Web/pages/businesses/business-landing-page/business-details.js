const productsButton = document.querySelector('.products-link')
const servicesButton = document.querySelector('.services-link')
const productCategoriesButton = document.querySelector('.product-categories-link')
const serviceCategoriesButton = document.querySelector('.service-categories-link')
const ordersButton = document.querySelector('.orders-link')

function onload() {
    // TODO
    let businessID = getParameterFromUrl("business_id")
    console.log("business id in business details", businessID)
    getBusinessForUserID(businessID)

    productCategoriesButton.addEventListener("click", function () {
        let url = `./business-categories.html?category_type=products&business_id=${businessID}`;
        window.location.href = url;
    });
    
    serviceCategoriesButton.addEventListener("click", function () {
        let url = `./business-categories.html?category_type=services&business_id=${businessID}`;
        window.location.href = url;
    });

    productsButton.addEventListener('click', event => {
        let url = `./business-details-items.html?state=products&business_id=${businessID}`
        window.location.href = url
    })
    
    servicesButton.addEventListener('click', event => {
        let url = `./business-details-items.html?state=services&business_id=${businessID}`
        window.location.href = url
    })

    ordersButton.addEventListener('click', event  => {
        let url = `./business-orders.html?business_id=${businessID}`
        window.location.href = url
    })
}

function getBusinessForUserID(businessID) {
     fetchBusinessForID(businessID)
     .then(business => {
        console.log("business", business)
        setupUIWithBusiness(business)
    })
}

function setupUIWithBusiness(business) {

    let nameLabel = document.querySelector('#company_name')
    let companyImage = document.querySelector('#company_logo')
    let emailLabel = document.querySelector('#company_email')
    let addressLabel = document.querySelector('#address')
    let phoneLabel = document.querySelector('#telephone_number')

    console.log("company logo", business.companyLogo)
    companyImage.style.backgroundImage = `url(${business.companyLogo})`
    nameLabel.textContent = business.name
    emailLabel.textContent = business.email
    addressLabel.textContent = business.address
    phoneLabel.textContent = business.phoneNumber
}