const baseUrl = "http://192.168.1.9:8080"
export const Post = (endpoint, body, header) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    })
}

export const Get = (endpoint, header) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: header
    })
}

export const Put = (endpoint, body, header) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(body)
    })
}