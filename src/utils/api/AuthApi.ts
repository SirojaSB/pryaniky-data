const baseUrl = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs'

export function authorize<T> (username: string, password: string): Promise<T> {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(info => {
            return info.data.token
        })
}
