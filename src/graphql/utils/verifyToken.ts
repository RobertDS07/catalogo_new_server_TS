import jwt from 'jsonwebtoken'

import { decodedToken } from '../modules/Products/types'


const verifyToken = (token: string) => new Promise<decodedToken>((res) => jwt.verify(token, process.env.SECRET || 'iauds8as97913', (err, decoded) => {
    if (err) res()

    res(decoded as decodedToken)
}))

export default verifyToken