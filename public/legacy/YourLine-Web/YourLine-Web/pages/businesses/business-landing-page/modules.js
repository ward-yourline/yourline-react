function init() {
    let businessCell = document.querySelector('.business-cell')

    businessCell.addEventListener('click', event => {
        console.log("cell tapped")
        window.location.href = "business-list.html"
    })
}