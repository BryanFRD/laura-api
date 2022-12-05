require('dotenv').config();
require('./src/models');
const database = require('./src/database/database');
const express = require('express');
const morgan = require('morgan');
const Logger = require('./src/helpers/Logger.helper');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schemas');
const { applyMiddlewareToDeclaredResolvers } = require('graphql-middleware');
const authMiddleware = require('./src/middlewares/Auth.middleware');
const statusHandlerMiddleware = require('./src/middlewares/StatusHandler.middleware');

const start = async () => {
  const err = await database.sync()
    .then(() => Logger.success('Database synchronized!'))
    .catch(err => err);
  
  if(err){
    Logger.error(`Error while trying to synchronize with databse!\nError: ${err}`);
    
    return;
  }
  
  const app = express();
  
  const schemaWithMiddleware = applyMiddlewareToDeclaredResolvers(schema, statusHandlerMiddleware, authMiddleware);
  
  app.use(
    cors({origin: process.env.ORIGIN, credentials: true}),
    morgan('dev'),
    express.json(),
    cookieParser(process.env.COOKIE_SECRET)
  )
  .use('/', graphqlHTTP({
    schema : schemaWithMiddleware,
    graphiql: process.env.NODE_ENV === 'development'
  }));
  
  app.listen(process.env.PORT);
}

start();