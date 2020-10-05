import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    fotourl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    cursor: {
        type: [String],
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
    }
})
// ADICIONAR UMA PARTE PARA DESTAQUES
export interface product extends mongoose.Document {
    fotourl: string
    name: string
    price: number
    size: string
    category: string
    description?: string
    cursor?: string[]
}

const Product = mongoose.model<product>('Produto', Schema)

export default Product