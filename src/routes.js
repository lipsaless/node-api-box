const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// user
routes.get('/users', UserController.getAll);
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);

// boxes
routes.get('/boxes', BoxController.getAll);
routes.post(
  '/boxes',
  multer(multerConfig).single('box'),
  BoxController.store
);
routes.get('/boxes/:id', BoxController.show);
routes.delete('/boxes/:id', BoxController.delete);

// files
routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
);
routes.delete('/boxes/:id/files/:id', FileController.delete);

module.exports = routes;