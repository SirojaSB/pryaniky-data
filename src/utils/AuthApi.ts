const baseUrl = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs'

interface RequestParams {
    url: string;
    method?: string;
    token?: string;
    data?: {
        [key: string]: string;
    }
}

function request<T> ({
                     url,
                     method = 'POST',
                     token,
                     data,
                 }: RequestParams): Promise<T> {
    return fetch(`${baseUrl}${url}`, {
        method,
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            ...!!token && { 'Authorization': `Bearer ${token}` },
        },
        ...!!data && { body: JSON.stringify(data) },
    })
        .then(getJsonOrError);
}

const getJsonOrError = async (res: Response) => {
    if (res.ok){
        return res.json();
    }
    const err = await res.json()

    return Promise.reject(err);
}

export const authorize = (username: string, password: string) => {
    return request({
        url: '/login',
        data: {username, password},
    })
}

/*.then(response => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json<T>()
}*/
