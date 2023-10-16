let recommendedItems = []
let trendingItems = []
let offeredItems = []

const recommendKey = `#recommended`
const offersKey = `#offers`
const trendingKey = `#trending`

function onLoad() {

  fetchRecommendedItems(6).then(result => {
    recommendedItems = result

    console.log("fetchRecommendedItems", this.fetchRecommendedItems)

    recommendedItems.forEach(item => {
      console.log(item)
      createItemsCollection(item, recommendKey)
    })
  })

  fetchTrendingItems(6).then(result => {
    trendingItems = result

    console.log("trendingItems", this.trendingItems)

    trendingItems.forEach(item => {
      console.log(item)
      createItemsCollection(item, trendingKey)
    })
  })

  fetchOffersItems(4).then(result => {
    offeredItems = result

    console.log("offeredItems found", offeredItems)

    offeredItems.forEach(item => {
      console.log(item)
      createItemsCollection(item, offersKey)
    })
  })
}

// Collections implementation
function createItemsCollection(item, sectionID) {
  let name = item.name
  let id = item.id
  let type = item.type
  let price = item.value
  let itemDesc = item.description
  let imageUrl = item.mainImage

  // Create the flex container
  var flexContainer = document.querySelector(sectionID)

  // Create the flex item
  var flexItem = document.createElement('div');
  flexItem.classList.add('flex-item');
  flexItem.setAttribute("section_key", sectionID)
  flexItem.setAttribute("item_id", item.id)

  flexItem.addEventListener(`click`, function () {

    if (event.target.tagName === 'BUTTON') {
      return; // Stop executing the rest of the event handler
    }
    didClickItem(item)
  })

  // Create the item wrapper
  var itemWrapper = document.createElement('div');
  itemWrapper.classList.add('item-wrapper');

  // Create the image element
  var itemImage = document.createElement('img');
  itemImage.style.backgroundImage = `url(${imageUrl})`;
  itemImage.style.backgroundSize = 'cover';
  itemImage.style.backgroundPosition = 'center center';
  itemImage.style.height = '150px';
  itemImage.style.maxHeight = '150px';
  itemImage.alt = '';

  var itemName = document.createElement('strong')
  itemName.textContent = name

  // Create the description element
  var description = document.createElement('small');
  description.textContent = itemDesc + "lorum ipsum lorum ipsumlorum ipsumlorum ipsumlorum ipsumlorum ipsumlorum ipsumlorum ipsumlorum ipsumlorum ipsum";
  description.classList.add("limit-text")


  // Create the price element
  var priceLabel = document.createElement('strong');
  priceLabel.textContent = "£" + price;

  // Create the add to cart button
  var addToCartBtn = document.createElement('button');
  addToCartBtn.className = "buy-button"
  addToCartBtn.style.width = '100%';
  addToCartBtn.textContent = 'Add to cart';

  addToCartBtn.addEventListener('click', function () {
    let itemID = this.parentNode.parentNode.parentNode.getAttribute("item_id")
    addItemToBasket(itemID)
  })

  // Append all the elements to the item wrapper
  itemWrapper.appendChild(itemImage);

  var content = [itemName, description, priceLabel, addToCartBtn]

  content.forEach(item => {
    let div = document.createElement('div')
    div.appendChild(item)
    itemWrapper.appendChild(div)
  })

  // Append the item wrapper to the flex item
  flexItem.appendChild(itemWrapper);

  // Append the flex item to the flex container
  flexContainer.appendChild(flexItem);
}

function addItemToBasket(id) {
  let userID = localStorage.getItem(kUserID)
  addItemToCart(userID, id, 1)
    .then(data => {
      didAddItems("Item added to basket")
    })
}

function didAddItems(text) {
  showToast(text)
}

function showToast(text) {
  const parentDocument = window.parent.document
  const toast = parentDocument.getElementById('toast');
  toast.classList.add('show');
  toast.textContent = text

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

function didClickItem(item) {
  console.log("showing item", item)
  var url = ``
  switch(item.type) {
      case "product":
          url = `../customer-item-details/customer-item-details-page.html?id=${encodeURIComponent(item.id)}`;
          break
      case "service":
          url = `../customer-item-details/customer-service-details.html?id=${encodeURIComponent(item.id)}`;
          break
  }

  window.location = url
}


function basketAnimation() {
  const addedItems = document.querySelector('#basket')
  addedItems.classList.add('basketAnimation')

  setTimeout(() => {
    addedItems.classList.remove('basketAnimation')
  }, 500);
}

function searchProducts() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.querySelector(".search-bar");
  filter = input.value.toUpperCase();
  table = document.querySelector("#items-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}