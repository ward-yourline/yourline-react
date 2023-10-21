// Mutations

// Constants

let createBusinessMutation = `
mutation CreateBusiness($input: BusinessInput!) {
    createBusiness(input: $input) {
      id
      name
      userID
      address
      phoneNumber
    }
  }
  `

let addSectorToBusinessMutation = `
  mutation AddSectorToBusiness($input: SectorInput!) {
    addSectorToBusiness(input: $input)
  }`

let addIndustryToBusinessMutation = `
  mutation AddIndustryToBusiness($input: IndustryInput!) {
    addIndustryToBusiness(input: $input)
  }`

let addCategoriesToBusinessMutation = `
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input)
  }`


let fetchCategoriesForBusiness = `
  query FetchAllCategoriesForBusinessID($id: ID!, $ofType: String) {
    fetchAllCategoriesForBusinessID(id: $id, ofType: $ofType) {
    name
    id
    businessID
    description
    type
 }
}
  `
let deleteCategoryWithID = `
mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
}
`

const deleteBusinessMutation = `
mutation deleteBusiness($id: ID!) {
  deleteBusiness(id: $id)
}
`

// TODO: Send token as part of the headers

function createBusiness(userID, name, address, phoneNumber, email, companyLogo) {
    console.log("create business called")

    let input = { userID, name, address, phoneNumber, email, companyLogo };

    return queryFetch(createBusinessMutation, { input })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred during signing up:", data.errors);
                throw data.errors[0];
            }

            // If sign-in is successful, redirect user to landing page
            console.log("Business create successful!");
            console.log(data);

            // Save the user data to local storage
            const businessData = data.data.createBusiness;
            localStorage.setItem(kBusinessID, businessData.id);

            // Navigate to the next page

            return data
        })
        .catch(error => {
            return showError(error, "createBusiness")
        });
}

function deleteBusiness(id) {
  
    return queryFetch(deleteBusinessMutation, { id })
      .then(data => {
        // Check for errors in the response
        if (data.errors) {
          console.log("Error occurred during deletion of business:", data.errors);
          throw data.errors[0];
        }
  
        console.log(data);
        return data.deleteBusiness
      })
      .catch(error => {
        return error
      });
  }


function addSectorToBusiness(businessID, sectors) {
    console.log("Add sectors called")

    let input = { businessID, sectors };

    return queryFetch(addSectorToBusinessMutation, { input })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred during adding sectors up:", data.errors);
                throw data.errors[0];
            }

            // If sign-in is successful, redirect user to landing page
            console.log("Adding sectors successful!");
            console.log(data);

            // Navigate to the next page

            return data
        })
        .catch(error => {
            return showError(error, "addSectorToBusinessMutation")
        });
}

function addIndustryToBusiness(businessID, industries) {
    console.log("addIndustryToBusiness called")

    let input = { businessID, industries };

    return queryFetch(addIndustryToBusinessMutation, { input })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred during addIndustryToBusiness", data.errors);
                throw data.errors[0];
            }

            // If sign-in is successful, redirect user to landing page
            console.log("addIndustryToBusiness successful!");
            console.log(data);

            // Navigate to the next page

            return data
        })
        .catch(error => {
            return showError(error, "addIndustryToBusinessMutation")
        });
}

function addCategoryToBusiness(businessID, name, description, type) {

    let input = { businessID, name, description, type };

    return queryFetch(addCategoriesToBusinessMutation, { input })
        .then(data => {
            // Check for errors in the response
            if (data.errors) {
                console.log("Error occurred during addCategoryToBusiness", data.errors);
                throw data.errors[0];
            }

            // If sign-in is successful, redirect user to landing page
            console.log("addCategoriesToBusiness successful!");
            console.log(data);

            // Navigate to the next page

            return data
        })
        .catch(error => {
            return showError(error, "addCategoryToBusiness")
        });
}

// Categories

function getCategoriesForBusiness(id, ofType) {
    return queryFetch(fetchCategoriesForBusiness, { id, ofType })
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during fetchCategoriesForBusiness", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            let categories = data.data.fetchAllCategoriesForBusinessID

            console.log(categories)

            return categories
        })
        .catch(error => {
            return showError(error, "fetchCategoriesForBusiness")
        });
}

function deleteCategory(id) {
    return queryFetch(deleteCategoryWithID, { id })
        .then(data => {
            if (data.errors) {
                console.log("Error occurred during deleteCategory", data.errors);
                throw data.errors[0];
            }
            console.log("response: ", data);

            return data
        })
        .catch(error => {
            return showError(error, "deleteCategory")
        });
}