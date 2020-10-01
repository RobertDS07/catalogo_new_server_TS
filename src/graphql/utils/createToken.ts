import jwt from 'jsonwebtoken'

const token = <T>(user: T, expiresIn: string) =>
    jwt.sign({ user }, process.env.SECRET || 'iauds8as97913', {
        expiresIn
    })

export default token