// Mutations

// Constants

let signUpMutation = `
mutation signUp($input: UserSignUpInput!) {
  signUp(input: $input) {
    id
    accessToken
    refreshToken
  }
}
  `
// TODO: Send token as part of the headers

// Sign Up
function signUp(email, username, password, accountType, firstName, surname, password, address, postCode, phoneNumber) {
  console.log("signUp called");

  const input = { email, username, password, accountType, firstName, surname, address, postCode, phoneNumber };

  return queryFetch(signUpMutation, { input })
    .then(data => {
      // Check for errors in the response
      if (data.errors) {
        console.log("Error occurred during signing up:", data.errors);
        throw data.errors[0];
      }

      // If sign-in is successful, redirect user to landing page
      console.log("Sign-up successful!");
      console.log(data);

      // Save the user data to local storage
      const signUpData = data.data.signUp;

      let userID = signUpData[kID]
      let accessToken = signUpData[kAccessToken]
      let refreshToken = signUpData[kRefreshToken]

      localStorage.setItem(kUserIDLocal, userID);
      localStorage.setItem(kAccessTokenLocal, accessToken);
      localStorage.setItem(kRefreshTokenLocal, refreshToken);

      let payload = parseToken(accessToken)
      const accountType = payload[kAccountType]
      if (accountType === kBusinessAccount) {
        console.log("Business account load");
        openBusinessProfileSetupPage()
      }

      if (accountType === kStandardAccount) {
        openCustomerLandingPage();
      }
    })
    .catch(error => {
      console.log("Error occurred during sign in:", error);

      // If sign-in fails, show error message to user
      const errorMessage =
        error.message || "There was an error signing up. Please try again.";
      window.alert(errorMessage);
    });
}

const deleteAccountMutation = `
mutation DeleteAccount($id: ID!) {
  deleteAccount(id: $id) 
}
`

function deleteAccount(id) {

  return queryFetch(deleteAccountMutation, { id })
    .then(data => {
      // Check for errors in the response
      if (data.errors) {
        console.log("Error occurred during deletion of account up:", data.errors);
        throw data.errors[0];
      }

      console.log(data);
      return data.deleteAccount
    })
    .catch(error => {
      return error
    });
}

const updateUserDetailsMutation = `
  mutation UpdateUserDetails($input: UserDetailsInput!) {
    updateUserDetails(input: $input) {
      id
    }
  }
`

// Sign Up
function updateUserDetails(userID, userImage, address, postCode, telephoneNumber) {
  const input = { userID, userImage, address, postCode, telephoneNumber };

  return queryFetch(updateUserDetailsMutation, { input })
    .then(data => {
      // Check for errors in the response
      if (data.errors) {
        console.log("Error occurred during signing up:", data.errors);
        throw data.errors[0];
      }

      console.log(data);

      return data.data.updateUserDetails;
    })
    .catch(error => {
      return error
    });
}