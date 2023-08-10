import dotenv from "dotenv"
import setupExpress from './express';
import setupGraphQL from './graphQL';

dotenv.config()

const app = setupExpress(); // Get the Express app instance

setupGraphQL(app); // Pass the app instance to setupGraphQL

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
