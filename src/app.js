import Express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import carritoRouter from "./routes/carrito.routes.js";
import productosRouter from "./routes/productos.routes.js";

const PORT = 8080;

const app = Express();

app.use(Express.json());

app.get("/", (_, res) => {
	return res.json({ message: "Bienvenido al root" });
});

app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
