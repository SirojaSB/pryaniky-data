const baseUrl = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs'

type DataType = {
    [key: string]: string;
}

interface RequestParams {
    url: string;
    method?: string;
    token?: string;
    data?: DataType;
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
            ...!!token && { 'x-auth': `${token}` },
        },
        ...!!data && { body: JSON.stringify(data) },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(info => {
            return info.data
        })
}

export function getData<T> (token: string) {
    return request<T>({
        url: '/get',
        method: 'GET',
        token: token,
    })
}

export function createRow<T> (token: string, data: DataType) {
    return request<T>({
        url: '/create',
        token,
        data,
    })
}

export function deleteRow<T> (token: string, id: string) {
    return request<T>({
        url: `/delete/${id}`,
        token,
    })
}

export function editRow<T> (token: string, id: string, data: DataType) {
    return request<T>({
        url: `/set/${id}`,
        token,
        data
    })
}
