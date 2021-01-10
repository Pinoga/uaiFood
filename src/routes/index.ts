import express from 'express';
import GraphQLRouter  from '../graphql'

import ApiRouter from './api';
// import schema from '../graphql/schema';

const MainRouter = express.Router();

MainRouter.use("/graphql", GraphQLRouter);
// MainRouter.use("/api", ApiRouter);


export default MainRouter;