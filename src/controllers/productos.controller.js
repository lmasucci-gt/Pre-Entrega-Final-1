import { Producto } from "../models/Producto.js";

const productos = [];

export const getProductos = (req, res) => {
	const { id } = req.query;
	if (id) return res.status(200).json(productos.find((p) => p.id == id));
	return res.status(200).json(productos);
};

export const agregarProducto = (req, res) => {
	try {
		const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
		const newProduct = new Producto(
			nombre,
			descripcion,
			codigo,
			imagen,
			precio,
			stock
		);
		productos.push(newProduct);
		return res.status(201).json(newProduct);
	} catch (err) {
		console.log(err);
	}
};

export const actualizarProducto = (req, res) => {
	const { id } = req.params;
	const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
	const producto = productos.find((p) => p.id == id);
	if (!producto) {
		return res.status(404).json({ msg: "Producto no encontrado" });
	}
	(producto.nombre = nombre),
    (producto.descripcion = descripcion),
    (producto.codigo = codigo),
    (producto.imagen = imagen),
    (producto.precio = precio),
    (producto.stock = stock);
	res.status(200).json(producto);
};

export const borrarProducto = (req, res) => {
	const { id } = req.params;
	const producto = productos.find((p) => p.id == id);
	if (!producto) {
		return res.status(404).json({ msg: "Producto no encontrado" });
	}
	const index = productos.findIndex((p) => p.id == id);
	productos.splice(index, 1);

	res.status(200).end();
};