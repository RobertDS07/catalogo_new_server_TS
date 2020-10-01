import bcrypt from 'bcryptjs'

import Users, { user } from '../../../models/User'

import { createUser, login } from './types'

import verifyData from '../../utils/verifyData'
import createJwt from '../../utils/createJwt'


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

            const newUser = await Users.create<Omit<user, 'keyPasswordRecovery' | 'admin'>>(data)
            newUser.password = ''

            const token = createJwt<user>(newUser, '365d')

            return token
        } catch (e) {
            return e
        }
    },
    login: async ({ password, email }: login) => {
        try {
            const user = await Users.findOne({ email }).select('+password')

            if (!user || ! await bcrypt.compare(password, user.password)) throw new Error('Credenciais invalidas')

            user.password = ''

            const token = createJwt<user>(user, '365d')

            return token
        } catch (e) {
            return e
        }
    }
}