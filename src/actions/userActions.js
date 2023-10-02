export function setProfile(userData) {
    return {
        type: "LOGIN_REQUEST",
        payload: userData
    };
}

export function removeProfile() {
    return {
        type: "LOGOUT",
        payload: {}
    };
}
