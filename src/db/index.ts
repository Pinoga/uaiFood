import {connect, connection} from 'mongoose'

export default async function() {
    await connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    
    connection.on('connected', () => {
        console.log('Connected to mongodb at %s', process.env.MONGO_URI);
    });
    
    connection.on('disconnected', () => {
        console.log('Disconnected from mongodb')
    });

    connection.on('error', (err) => {
        console.error('The following error has occurred:\n%s', err)
    })

    // mongoose.connection.on('open', (err) => {
    //     mongoose.connection.db.listCollections().toArray().then(col => console.log(col))
    // })
}