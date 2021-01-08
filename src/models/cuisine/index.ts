import {Schema} from 'mongoose'

const CuisineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

export default CuisineSchema