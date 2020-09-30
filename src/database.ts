import mongoose from 'mongoose'

const connectDB = async () => await mongoose.connect(process.env.DB || 'mongodb://localhost:27017/testTs', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => console.log('db connected'))

export default connectDB