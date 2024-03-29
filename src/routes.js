import { Router } from "express";
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import CategoryController from "./app/controllers/CategoryController";
import authMiddleware from './app/middlewares/auth'
import OrderController from "./app/controllers/OrderController";

const upload = multer(multerConfig)
const routes = new Router();
routes.get('/', (req, res) =>{
    return res.json({message:'Hello my api'})
})

routes.post('/users', UserController.store );
routes.post('/sessions', SessionController.store );

routes.use(authMiddleware)// será chamda por todas as rotas ABAIXO

routes.post('/products',upload.single('file'), ProductController.store );
routes.get('/products', ProductController.index );
routes.put('/products/:id', upload.single('file'), ProductController.update);


routes.post('/categories', upload.single('file'), CategoryController.store );
routes.put('/categories/:id', upload.single('file'), CategoryController.update );
routes.get('/categories', CategoryController.index );

routes.post('/orders', OrderController.store );
routes.put('/orders/:id', OrderController.update);
routes.get('/orders', OrderController.index );

export default routes;
