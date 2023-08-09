import express from 'express';
import cors from 'cors';

const setupExpress = () => {
    const app = express();
    app.use(cors());
}

export default setupExpress;
