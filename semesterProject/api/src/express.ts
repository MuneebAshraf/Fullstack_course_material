import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const setupExpress = () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    return app; // Return the app instance
}

export default setupExpress;
