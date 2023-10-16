function resetCart(items) {
  let element = document.querySelector('.items-section')
  console.log("cart resetted", element)

  while (element.firstChild) {
    console.log(`first child removed ${element.firstChild}`)
    element.removeChild(element.firstChild);
  }

  showEmptyLabel(items == null)
}

function setupUI() {
  let paymentButton = document.querySelector('.payment-button')
  paymentButton.addEventListener('click', function() {
    didFinishCheckout()
  })
}

function createCell(item) {
  let name = item.name
  let mainImage = item.mainImage
  let quantity = item.quantity
  let value = item.value.toFixed(2)
  let sections = document.querySelector('.items-section')

  console.log(sections)

  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.classList.add('shadowed')
  let htmlString = `
    <span style="display: flex; flex-direction: row; gap: 40px; align-items: start;">
      <div class="product-image">
        <img src="${mainImage}" alt="">
      </div>
      <div class="product-details" style="display: flex;flex-direction: row; width: 100%;" >
        <div style="width: 100%">
          <p style="width: 100%">${name}</p>
        </div>
        <div class="price-details">
          <h2>£${value}</h2>
          <div>
            <div style="display: flex; flex-direction: column; max-height: 60px; gap: 10px">
              <div class="selection-box">  
                <select class="quantity-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <!-- Add options for numbers 4 to 10 -->
                  </select>
                </div>
              <button class="remove-button button-style-remove">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </span>
    `;
  cell.innerHTML = htmlString;

  const button = cell.querySelector(".remove-button") // Maybe this will work. Maybe.
  
  // Set quantity returned from BE
  const quantitySelect = cell.querySelectorAll('option')
  quantitySelect.forEach((option, index) => {
    if (option.value == item.quantity) {
      option.selected = true
    }
  })

  console.log("***********", quantitySelect)

  button.addEventListener('click', function () {

    let sections = document.querySelector('.items-section')
    const cells = sections.querySelectorAll('.cell');
    var index = Array.from(cells).indexOf(this.closest('.cell'));

    removeItemFromCartAtIndex(index)
  })

  sections.appendChild(cell);

  console.log(cell)
}

function showEmptyLabel(show) {
  const emptyLabel = document.querySelector('.empty-label');
  const sections = document.querySelectorAll('.sections')

  sections.forEach(section => {
    section.style.display = show ? "none" : "block"
  })
  if (show) {
    emptyLabel.style.display = "block"; // Show the empty label
  } else {
    emptyLabel.style.display = "none";  // Hide the empty label
  }
}