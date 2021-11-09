import { Carrito } from "../models/Carrito.js";
import { Producto } from "../models/Producto.js";
import DB from "../models/FileCarrito.js";



export const getCarrito = (req, res) => {
	try {		
		const carrito = new Carrito();
		console.log(carrito);
		DB.createData(carrito);
		console.log(carrito);
		return res.status(200).json(carrito.productos.length == 0 ? {msg: "Aun no tiene productos en su carrito"} : carrito);
	} catch (error) {
		console.log(error)
	}
};

export const getProductsFromCarrito = (req, res) => {
	const carrito = DB.getData()
	return res.status(200).json(carrito.productos);
};

export const agregarProducto = (req, res) => {
	try {
	  const carrito = DB.getData();
	  const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
	  const newProduct = new Producto(
		nombre,
		descripcion,
		codigo,
		imagen,
		precio,
		stock
	  );
	  carrito.productos.push(newProduct);
	  const addOK = DB.createData(carrito);
	  if (addOK) return res.status(201).json(carrito);
	} catch (err) {
	  console.log(err);
	}
  };

  export const borrarProducto = (req, res) => {
	const { id } = req.params;
	const productos = DB.getData();
	const producto = productos.find((p) => p.id == id);
	if (!producto) {
	  return res.status(404).json({ msg: "Producto no encontrado" });
	}
	const index = productos.findIndex((p) => p.id == id);
	productos.splice(index, 1);
	const updateOK = DB.updateData(productos);
	if (updateOK)
	  res
		.status(200)
		.json({
		  msg: `El producto ${productos[indice].descripcion} se elimino correctamente`,
		});
	res.status(200).end();
  };
  