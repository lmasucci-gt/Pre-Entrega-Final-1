import { Producto } from "../models/Producto.js";
import DB from "../models/FileProductos.js";

export const getProductos = (req, res) => {
  try {
    const productos = DB.getData();
    const { id } = req.query;
    console.log(id);
    if (id) return res.status(200).json(productos.find((p) => p.id == id));
    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const agregarProducto = (req, res) => {
  try {
    const productos = DB.getData();
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
    const addOK = DB.createData(newProduct);
    if (addOK) return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
  }
};

export const actualizarProducto = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
    const productos = DB.getData();
    const indice = productos.findIndex((producto, indice) => {
      if (producto.id == id) {
        return true;
      }
    });
    if (indice != -1) {
      productos[indice].nombre = nombre;
      productos[indice].descripcion = descripcion;
      productos[indice].codigo = codigo;
      productos[indice].imagen = imagen;
      productos[indice].precio = precio;
      productos[indice].stock = stock;
      const updateOK = DB.updateData(productos);
      if (updateOK)
        res.status(200).json({
          msg: `El producto ${productos[indice].nombre} se actualizo correctamente`,
        });
    } else {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const borrarProducto = (req, res) => {
  try {
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
      res.status(200).json({
        msg: `El producto se elimino correctamente`,
      });
    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
};
