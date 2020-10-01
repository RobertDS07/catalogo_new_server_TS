export interface products {
    sort?: string
    cursor?: string
    limit: number
}

export interface createProduct {
    token: string
    data: {
        fotourl: string
        name: string
        price: number
        size: string
        category: string
        description?: string
    }
}

export interface decodedToken {
    user: {
        admin: Boolean,
        _id: string,
        name: string,
        password: string,
        email: string,
        whatsapp: string,
    }
}