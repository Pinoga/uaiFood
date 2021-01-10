import 'reflect-metadata';
import dbconnect from './db'
import startServer from './server/start';

dbconnect()
startServer()
