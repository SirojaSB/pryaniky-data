export const baseUrl = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs'

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
        .then(getJsonOrError);
}

const getJsonOrError = async (res: Response) => {
    if (res.ok){
        return res.json();
    }
    const err = await res.json()

    return Promise.reject(err);
}

export const getData = (token: string) => {
    return request({
        url: '/get',
        method: 'GET',
        token: token,
    })
}

export const createCell = (token: string, data: DataType) => {
    return request({
        url: '/create',
        token,
        data,
    })
}

export const deleteCell = (token: string, id: string) => {
    return request({
        url: `/delete/${id}`,
        token,
    })
}

export const editCell = (token: string, id: string, data: DataType) => {
    return request({
        url: `/set/${id}`,
        token,
        data
    })
}
