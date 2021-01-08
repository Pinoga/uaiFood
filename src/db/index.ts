import mongoose from 'mongoose'

export default function() {
    mongoose.connect(process.env.MONGO_URI);
    
    mongoose.connection.on('connected', () => {
        console.log('Connected to mongodb at %s', process.env.MONGO_URI);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from mongodb')
    });

    mongoose.connection.on('error', (err) => {
        console.error('The following error has occurred:\n%s', err)
    })
}