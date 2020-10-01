export interface createUser {
    data: {
        name: string
        password: string
        email: string
        whatsapp: string
    }
}

export interface login {
    email: string
    password: string
}