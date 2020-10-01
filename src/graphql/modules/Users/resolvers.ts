import bcrypt from 'bcryptjs'

import Users, { user } from '../../../models/User'

import { createUser, login } from './types'

import verifyData from '../../utils/verifyData'
import verifyToken from '../../utils/verifyToken'
import createToken from '../../utils/createToken'


export const resolvers = {
    createUser: async ({ data }: createUser) => {
        try {
            verifyData<typeof data>(data)

            if (data.password.length < 5) throw new Error('Senha deve conter 5 caracteres ou mais.')

            const alredyExist = await Users.findOne({
                $or: [
                    { email: data.email },
                    { whatsapp: data.whatsapp }
                ]
            })

            if (!!alredyExist) throw new Error('Já temos um registro com essas credencias em nosso sistema.')

            const newUser = await Users.create(data)
            
            newUser.password = ''

            const token = createToken<user>(newUser, '365d')

            return token
        } catch (e) {
            return e
        }
    },
    login: async ({ password, email }: login) => {
        try {
            verifyData<login>({ password, email })

            const user = await Users.findOne({ email }).select('+password')

            if (!user || ! await bcrypt.compare(password, user.password)) throw new Error('Credenciais invalidas.')

            user.password = ''

            const token = createToken<user>(user, '365d')

            return token
        } catch (e) {
            return e
        }
    },
    verifyToken: async ({ token }: { token: string }) => {
        const validToken = await verifyToken(token)

        if (!validToken) return false

        return true
    }
}