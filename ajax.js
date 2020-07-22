function getUsersFromServer (params) {
    const { url, method = "GET" } = params
    return $.ajax({
        url,
        method,
    })
}