/* 
TODO: add parameters
Example:
function openBusinessSignUpExample(params) {
  let location = "../businesses/business-profile-pages/business-sign-up-page.html?="
  params.forEach( (key, value) => {
    location += `${key}=${value}`
  })

  window.open(location, "_self")
}
*/

function openBusinessSignUp() {
  window.open("../businesses/business-profile-pages/business-sign-up-page.html","_self")
}

function openCustomerLandingPage() {
  window.open("../customer/customer-landing-page/customer-landing-page.html","_self")
}

function openBusinessLandingPage() {
  window.open("../businesses/business-landing-page/business-landing-page.html", "_self")
}

function openBusinessProfileSetupPage() {
  window.open("../businesses/business-profile-pages/business-sign-up-page.html","_self")
}

function openLandingPage() {
  window.open("../businesses/business-landing-page/business-landing-page.html", "_self")
}