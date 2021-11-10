import { Carrito } from "../models/Carrito.js";
import { Producto } from "../models/Producto.js";
import DB from "../models/FileCarrito.js";


//Interprete esto como al entrar a una tienda, automaticamente crea un carrito para el usuario que se conecto
export const getCarrito = (req, res) => {
	try {		
		const carrito = new Carrito();
		DB.firstCarrito(carrito);
		return res.status(200).json({res: "ok"});
	} catch (error) {
		console.log(error)
	}
};

export const getProductsFromCarrito = (req, res) => {
	const carrito = DB.getData()
	return res.status(200).json(carrito.productos.lenght > 0 ? carrito.productos : {msg: 'Su carrito esta vacio'});
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
	try {
		const idparams= req.params.id;
		const carrito = DB.getData();
		const { productos, id, timestamp } = carrito
		const producto = productos.find((p) => p.id == idparams);
		if (!producto) {
		  return res.status(404).json({ msg: "Producto no encontrado" });
		}
		const index = productos.findIndex((p) => p.id == id);
		productos.splice(index, 1);
		const newCarrito = {
			id: id,
			timestamp: timestamp,
			productos: productos,
		}
		const updateOK = DB.updateData(newCarrito);
		if (updateOK)
		  res
			.status(200)
			.json({
			  msg: `El producto se elimino correctamente`,
			});
		res.status(200).end();	
	} catch (error) {
		console.log(error);
	}

  };
  