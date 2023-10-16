// Queries

const signInQuery = `
  query signIn($input: UserSignInInput!) {
    signIn(input: $input) {
      id
      accessToken
      refreshToken
    }
  }
  `

const fetchUserQuery = `
  query FetchUserWithID($id: ID!) {
    fetchUserWithID(id: $id) {
      id
      email
      accountType
      username
      userImage
      address
      postCode
      telephoneNumber
    }
  }
`

// Sign in
function signIn(email, password) {
  console.log("signIn called");

  let input = { email, password };
  queryFetch(signInQuery, { input })
    .then(data => {
      // Check for errors in the response
      if (data.errors) {
        console.log("Error occurred during sign in:", data.errors);

        throw data.errors[0];
      }

      const token = data.data.signIn[kAccessToken]
      console.log("data:" + data)
      console.log("Token" + token)

      let payload = parseToken(token)
      let id = payload["id"]

      localStorage.setItem(kUserIDLocal, id)

      openLandingPage()
    })
    .catch(error => {
      console.log("Error occurred during sign in:", error);

      // If sign-in fails, show error message to user
      const errorMessage = error.message || "There was an error signing in. Please try again.";
      window.alert(errorMessage)
    });

  return accountType;
}


function fetchUserForID(id) {
  if (id == null) {
    return []
  }

  let input = { id }
  return queryFetch(fetchUserQuery, input)
    .then(data => {
      console.log(data)
      console.log(data.data.fetchUserWithID)
      return data.data.fetchUserWithID
    }).catch(error => {
      console.log(error)
      return error
    })
}