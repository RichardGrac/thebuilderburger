const BASE_URL = 'https://react-burgerbuilder-e5ba3.firebaseio.com/'

const headers = new Headers({
    'Content-Type': 'application/json'
})

export const postHttpRequest = async (url = BASE_URL, body) => {
    let params = {
        headers,
        body: JSON.stringify(body),
        method: 'POST'
    }

    let response = await fetch(url, params)
    if (response.ok) return await response.json()
    else throw response
}