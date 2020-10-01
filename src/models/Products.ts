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
    description: {
        type: String,
    },
    cursor: {
        type: Number
    }
})

interface product extends mongoose.Document {
    fotourl: string
    name: string
    price: number
    size: string
    category: string
    description: string
    cursor: number
}

const Product = mongoose.model('Produto', Schema)

Schema.pre<product>('save', async function () {
    const product = await Product.find({})

    product.length <= 10 ? this.cursor = 10 : this.cursor = parseInt(String((product.length/10)+10)) 
})

export default Product