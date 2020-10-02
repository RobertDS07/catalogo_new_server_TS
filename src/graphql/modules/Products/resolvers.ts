import Products from '../../../models/Products'

import { products, createProduct, updateProduct, deleteProduct } from './types'

import verifyData from '../../utils/verifyData'
import verifyToken from '../../utils/verifyToken'

export const resolvers = {
    products: async ({ sort, cursor, limit, search}: products) => {
        try {
            if (!search) search = ''

            // const products = !!cursor ? !sort ? await Products.find({ name: { $regex: search } }).sort('category').limit(limit) : await Products.find({ name: { $regex: search } }).sort({ price: sort }).limit(limit) : !sort ? await Products.find({ name: { $regex: search } }).sort('category').limit(limit) : await Products.find(({ name: { $regex: search } })).sort({ price: sort }).limit(limit)
            const products = !!cursor ? !sort ? await Products.find({ $and: [{ name: { $regex: search } }, { _id: { $gt: cursor } }] }).sort('category').limit(limit) : await Products.find({ $and: [{ name: { $regex: search } }, { _id: { $gt: cursor } }] }).sort({ price: sort }).limit(limit) : !sort ? await Products.find({ name: { $regex: search } }).sort('category').limit(limit) : await Products.find(({ name: { $regex: search } })).sort({ price: sort }).limit(limit)

            if (!products) throw new Error('Ooops, houve algo de errado. Tente novamente mais tarde.')

            // if (cursor === 0) products.splice(10)

            // console.log(products);
            

            return products
        } catch (e) {
            return e
        }
    },
    product: async ({ _id }: { _id: string }) => {
        const product = await Products.findOne({ _id })

        return product
    },
    categories: async () => await Products.distinct('category'),
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
    },
    updateProduct: async ({ token, data, _id }: updateProduct) => {
        try {
            verifyData<typeof data>(data)

            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.')

            if (!verifiedToken.user.admin) throw new Error('Você não esta autorizado a fazer isso.')

            const updatedProduct = await Products.updateOne({ _id }, data)

            if (!updatedProduct) throw new Error('Ocorreu algum erro no processo... Tente novamente.')

            return true
        } catch (e) {
            return e
        }
    },
    deleteProduct: async ({ token, _id }: deleteProduct) => {
        try {
            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.')

            if (!verifiedToken.user.admin) throw new Error('Você não esta autorizado a fazer isso.')

            const deletedProduct = await Products.findOneAndDelete({ _id })

            if (!deletedProduct) throw new Error('Ocorreu algum erro no processo... Tente novamente.')

            return true
        } catch (e) {
            return e
        }
    }
}