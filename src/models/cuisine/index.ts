import {Schema} from 'mongoose'

const CuisineSchema = new Schema({
    name: {
        type: String
    },
})

export default CuisineSchema