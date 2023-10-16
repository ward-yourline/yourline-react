const createItemMutation = `
mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      businessID
      name
      id
      type
    }
  }`

function createItem(businessID, mainImage, categoryID, name, description, type, value, parentID, isPurchasable, isVisible) {
    const input = { businessID, mainImage, categoryID, name, description, type, value, parentID, isPurchasable, isVisible }

    console.log("****createItem input:", input)

    return queryFetch(createItemMutation, { input })
        .then(data => {
            console.log("createItem")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred createItem:", data.errors);
                throw data.errors[0];
            }

            console.log("createItem successful!");
            console.log(data);

            return data
        })
        .catch(error => {
            return showError(error, "createItem")
        });
}

const deleteItemMutation = `
mutation deleteItemWithID($id: ID!) {
    deleteItemWithID(id: $id) 
}`

function deleteItemWithID(id) {
    console.log("calling deleteItemWithID(...)")

    let input = { id }
    return queryFetch(deleteItemMutation, input)
        .then(data => {
            return data
        }).catch(error => {
            return error
        })
}

const editItemMutation = `
mutation EditItem($input: EditItemInput!) {
    editItem(input: $input)
}`

function editItemWith(itemID, name, mainImage, description, value) {

    const input = { itemID, name, description, mainImage, value }
    console.log("edit item input is", input)

    return queryFetch(editItemMutation, { input })
        .then(data => {
            console.log("editItemMutation")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred editItemMutation:", data.errors);
                throw data.errors[0];
            }

            console.log("editItemMutation successful!");
            console.log(data);

            return data
        })
        .catch(error => {
            return error
        });
}

const fetchAllItemsQuery = `
query FetAllItems($itemType: String, $orderedBy: String) {
    fetchAllItems(itemType: $itemType, orderedBy: $orderedBy) {
      name
      id
      type
      businessID
      categoryID
      description
      value
      mainImage
    }
  }
`

function fetchAllItems(itemType, orderedBy) {
    input = { itemType, orderedBy }
    return queryFetch(fetchAllItemsQuery, input)
        .then(data => {
            console.log("getAllItems")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred getAllItems:", data.errors);
                throw data.errors[0];
            }

            console.log("getAllItems successful!");
            console.log(data);

            const items = data.data.fetchAllItems;
            
            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "getAllItems")
        });
}

const fetchItemsForStringQuery = `
query FetchItems($limit: Int!, $name: String, $itemType: String, $orderedBy: String) {
    fetchItems(limit: $limit, name: $name, itemType: $itemType, orderedBy: $orderedBy) {
        name
        id
        type
        businessID
        categoryID
        description
        value
        mainImage
        isVisible
    }
  }`

function fetchItemsForString(name, limit, itemType, orderedBy) {
    const input = { limit, name, itemType, orderedBy }
    console.log("fetchItemsForString with search value", name, "with limit", limit)
    return queryFetch(fetchItemsForStringQuery, input)
        .then(data => {
            console.log("fetchItemsForString")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchItemsForString:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchItemsForString successful!");
            console.log(data);

            const items = data.data.fetchItems;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchItemsForString")
        });
}

const fetchRecommendedItemsQuery = `
query FetchRecommendedItems($limit: Int!) {
    fetchRecommendedItems(limit: $limit) {
        name
        id
        type
        businessID
        categoryID
        description
        mainImage
        value
    }
  }
`

function fetchRecommendedItems(limit) {
    const input = { limit }
    return queryFetch(fetchRecommendedItemsQuery, input)
        .then(data => {
            console.log("fetchRecommendedItems")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchRecommendedItems:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchRecommendedItems successful!");
            console.log(data);

            const items = data.data.fetchRecommendedItems;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchRecommendedItems")
        });
}


const fetchTrendingItemsQuery = `
query FetchTrendingItems($limit: Int!) {
    fetchTrendingItems(limit: $limit) {
        name
        id
        type
        businessID
        categoryID
        description
        mainImage
        value
    }
  }
`

function fetchTrendingItems(limit) {
    const input = { limit }
    return queryFetch(fetchTrendingItemsQuery, input)
        .then(data => {
            console.log("fetchTrendingItems")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchTrendingItems:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchTrendingItems successful!");
            console.log(data);

            const items = data.data.fetchTrendingItems;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchTrendingItems")
        });
}

const fetchOffersItemsQuery = `
query FetchOffersItems($limit: Int!) {
    fetchOffersItems(limit: $limit) {
        name
        id
        type
        businessID
        categoryID
        description
        mainImage
        value
    }
  }
`

function fetchOffersItems(limit) {
    const input = { limit }
    return queryFetch(fetchOffersItemsQuery, input)
        .then(data => {
            console.log("fetchOffersItems")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchOffersItems:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchOffersItems successful!");
            console.log(data);

            const items = data.data.fetchOffersItems;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchItems")
        });
}

const fetchItemsForCategoryIDQuery = `
    query FetchItemsForCategoryID($id: ID!) {
        fetchItemsForCategoryID(id: $id) {
            id
            name
            type
            businessID
            categoryID
            value
            description
            mainImage
            childrenIDs
            isVisible
            isPurchasable
            stock
        }
    }
`

function fetchItemsForCategoryID(id) {
    const input = { id }
    return queryFetch(fetchItemsForCategoryIDQuery, input)
        .then(data => {
            console.log("fetchItemsForCategoryID")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchItemsForCategoryID:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchItemsForCategoryID successful!");
            console.log(data);

            const items = data.data.fetchItemsForCategoryID;

            if (items == null) {
                return []
            }

            return items
        })
        .catch(error => {
            return showError(error, "fetchItemsForCategoryID")
        });
}

const fetchItemsForIDsQuery = `
    query FetchItemsForIDs($itemIDs: [ID!]!) {
        fetchItemsForIDs(itemIDs: $itemIDs) {
            id
            name
            type
            businessID
            categoryID
            value
            description
            mainImage
            childrenIDs
            stock
        }
    }
`

function fetchItemsForIDs(itemIDs) {
    const input = { itemIDs }
    return queryFetch(fetchItemsForIDsQuery, input)
        .then(data => {
            console.log("fetchItemsForIDsQuery")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchItemsForIDsQuery:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchItemsForIDsQuery successful!");
            console.log(data);

            const item = data.data.fetchItemsForIDs;

            if (item == null) {
                return []
            }

            return item
        })
        .catch(error => {
            return showError(error, "fetchItemsForIDs")
        });
}

const fetchItemForIDQuery = `
    query FetchItem($id: ID!) {
        fetchItem(id: $id) {
            id
            name
            type
            businessID
            categoryID
            value
            description
            mainImage
            childrenIDs
            isVisible
            stock
        }
    }
`

function fetchItemForID(id) {
    const input = { id }
    return queryFetch(fetchItemForIDQuery, input)
        .then(data => {
            console.log("fetchItemsForID")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred fetchItemForIDQuery:", data.errors);
                throw data.errors[0];
            }

            console.log("fetchItemsForID successful!");
            console.log(data);

            const item = data.data.fetchItem;

            if (item == null) {
                return []
            }

            return item
        })
        .catch(error => {
            return showError(error, "fetchItemForIDQuery")
        });
}

const addChildItemToParentItemMutation = `
    mutation AddChildIDToItem($parentID: ID!, $childID: ID!) {
        addChildIDToItem(parentID: $parentID, childID: $childID)
  }`

function addChildItemToParentItem(parentID, childID) {

    const input = { parentID, childID }
    console.log("adding child to parent", input)
    return queryFetch(addChildItemToParentItemMutation, input)
        .then(data => {
            console.log("addChildItemToParentItem")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred addChildItemToParentItem:", data.errors);
                throw data.errors[0];
            }

            console.log("addChildItemToParentItem successful!");
            console.log(data);

            const item = data.data.addChildIDToItem;

            if (item == null) {
                return []
            }

            return item
        })
        .catch(error => {
            return showError(error, "addChildItemToParentItemMutation")
        });
}

const deleteChildItemFromParentMutation = `
mutation DeleteChildIDForItem($childID:ID!, $parentID:ID!) {
    deleteChildIDForItem(childID: $childID, parentID: $parentID)
  }`

function deleteChildItemFromParent(parentID, childID) {

    const input = { childID, parentID }
    return queryFetch(deleteChildItemFromParentMutation, input)
        .then(data => {
            console.log("deleteChildItemFromParent")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred deleteChildItemFromParent:", data.errors);
                throw data.errors[0];
            }

            console.log("deleteChildItemFromParent successful!");
            console.log(data);

            const item = data.data.deleteChildIDForItem;

            return item
        })
        .catch(error => {
            return showError(error, "deleteChildItemFromParent")
        });
}

const freezeItemMutation = `
mutation FreezeItem($id: ID!) {
    freezeItem(id: $id)
  }
`

const unFreezeItemMutation = `
mutation UnFreezeItem($id: ID!) {
   unFreezeItem(id: $id)
  }
`

function freezeItem(id, freeze) {

    let mutation = freeze ? freezeItemMutation : unFreezeItemMutation

    return queryFetch(mutation, { id })
        .then(data => {
            console.log("freezeItem")

            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred freezeItem:", data.errors);
                throw data.errors[0];
            }

            console.log("freezeItem successful!");
            console.log(data);

            return data
        })
        .catch(error => {
            return error
        });
}