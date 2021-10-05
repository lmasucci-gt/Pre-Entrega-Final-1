import Express from "express";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import carritoRouter from "./src/routes/carrito.routes.js";
import productosRouter from "./src/routes/productos.routes.js";

const app = Express();

app.use(Express.json());

app.get("/", (_, res) => {
	return res.json({ message: "Bienvenido al root" });
});

app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);
app.use(errorHandlerMiddleware);

export default app;
