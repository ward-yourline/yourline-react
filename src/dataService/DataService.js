const LocalStorageKeys = {
    userID: "user_id",
    accessToken: "access_token",
    refreshToken: "refresh_token"
}

export const storeUser = (id, accessToken, refreshToken) => {
    localStorage.setItem(LocalStorageKeys.userID, id)
    localStorage.setItem(LocalStorageKeys.accessToken, accessToken)
    localStorage.setItem(LocalStorageKeys.refreshToken, refreshToken)
}