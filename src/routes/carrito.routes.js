import { Router } from "express";
import {
	agregarProducto,
	borrarProducto,
	getCarrito,
	getProductsFromCarrito,
} from "../controllers/carrito.controller.js";

const carritoRouter = Router();

carritoRouter.get("/", getCarrito);
carritoRouter.get("/productos", getProductsFromCarrito);
carritoRouter.post("/productos", agregarProducto);
carritoRouter.delete("/productos/:id", borrarProducto);

export default carritoRouter;