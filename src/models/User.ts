import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    whatsapp: {
        type: String,
        unique: true,
        required: true
    },
    keyPasswordRecovery: {
        type: String,
        required: false
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    }
})

export interface user extends mongoose.Document {
    name: string
    password: string
    email: string
    whatsapp: string
    keyPasswordRecovery?: string
    admin?: boolean
}

Schema.pre<user>('save', async function () {
    this.password  = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model<user>('User', Schema)
export default User