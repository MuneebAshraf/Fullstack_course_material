import dotenv from "dotenv"
import setupExpress from './express';
import setupGraphQL from './graphQL';

dotenv.config()

setupExpress();

setupGraphQL()
