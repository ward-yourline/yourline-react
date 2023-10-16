function reloadviewWithItems(items) {
    reloadTable()
        .then(success => {
            if (success && items) {
                items.forEach(item => {
                    createCellWithItem(item)
                })
            }
        })
}

// UI functions
function createCellWithItem(item) {
    let sections = document.querySelectorAll('ul')[0]

    let name = item.name
    let type = item.type
    let desc = item.description
    let imageUrl = item.mainImage
    let price = item.value

    let display = item.type == "product" ? "flex" : "none"

    let htmlString = `
    <span class="product-details">
                <div class="product-image">
                    <img src=${imageUrl} alt="">
                </div>
                <div class="product-info">
                    <div>
                        <h4>${name}</h4>
                        <p>${desc}</p>
                    </div>
                    <div class="price-details" style="display: ${display}">
                        <h2 style="margin-bottom: 0px;">£${price}</h2>
                        <div>
                            <span style="display: flex; flex-direction: row; gap: 10px; height: 50px;">
                                <button class="submit-button"
                                    style="text-align: center; border: 0px solid white;">Add to cart</button>
                            </span>
                        </div>
                    </div>
                </div>
            </span>
      </div>
    </div>
  </span>
`;

    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('shadowed')
    cell.innerHTML = htmlString;

    const button = cell.querySelector(".submit-button")

    console.log("store button", button)

    cell.addEventListener('click', function () {

        let index = getIndexForCell(this)
        let item = didSelectItemAtIndex(index)

        console.log("cell", cell, "at index", index, "item", item)

        showItem(item)
    })

    button.addEventListener('click', function (event) {

        event.stopPropagation()

        let index = getIndexForCell(this)
        let item = didSelectItemAtIndex(index)

        console.log("button", this, "at index", index, "item", item)

        shouldAddItemToCart(item)
    })

    sections.appendChild(cell);
    console.log(cell)
}

// Helper methods
function getIndexForCell(cell) {
    let sections = document.querySelectorAll('.sections')[0]
    const cells = sections.querySelectorAll('.cell');
    var index = Array.from(cells).indexOf(cell.closest('.cell'));

    return index
}
