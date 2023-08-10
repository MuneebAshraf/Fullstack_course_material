import models from './models';
const mongoose = require('mongoose');

export const setupMongoose = () => {

    const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@muneebfullstacktypescri.sluhaz6.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    mongoose.connect(MONGODB_URI,);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err: Error) => {
        console.error(`Failed to connect to MongoDB: ${err.message}`);
    });
    return models;
}
