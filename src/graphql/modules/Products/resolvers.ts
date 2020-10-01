import Products from '../../../models/Products'

import { products, createProduct } from './types'

import verifyData from '../../utils/verifyData'
import verifyToken from '../../utils/verifyToken'

export const resolvers = {
    products: async ({ sort, cursor, limit }: products) => {
        try {
                const products = !!cursor ? !sort ? await Products.find({ _id : {$gt: cursor}}).limit(limit) : await Products.find({ _id : {$gt: cursor}}).sort({ price: sort }).limit(limit) : !sort ? await Products.find().limit(limit) : await Products.find().sort({ price: sort }).limit(limit) 

            if (!products) throw new Error('Ooops, houve algo de errado. Tente novamente mais tarde.')

            return products
        } catch (e) {
            return e
        }
    },
    product: async ({ _id }: {_id: string}) => {
        const product = await Products.findOne({_id})

        return product
    },
    categories: async() => await Products.distinct('category'),
    createProduct: async ({ token, data }: createProduct) => {
        try {
            verifyData<typeof data>(data)

            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.')

            if (!verifiedToken.user.admin) throw new Error('Você não esta autorizado a fazer isso.')

            const createdProduct = await Products.create(data)

            if (!createdProduct) throw new Error('Houve algum problema na hora de cadastrar, tente novament.')

            return true
        } catch (e) {
            return e
        }
    }
}