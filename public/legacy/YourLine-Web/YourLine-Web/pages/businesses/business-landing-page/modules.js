function init() {
    const businessCell = document.querySelector('.business-cell')
    const shoppingCell = document.querySelector('.shopping-cell')

    shoppingCell.addEventListener('click', event => {
        console.log("cell tapped")
        window.location.href = "../../customer/customer-landing-page/customer-landing-page.html"
    })

    businessCell.addEventListener('click', event => {
        console.log("cell tapped")
        window.location.href = "business-list.html"
    })
}