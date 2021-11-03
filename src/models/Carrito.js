import fs from 'fs'
import { v4 } from "uuid";

const dbCarrito = './Carrito.txt';

export class Carrito {
	constructor() {
		this.id = v4();
		this.timestamp = Date.now();
		this.productos = [];
	}
	readFile() {
		try {
			const productos = fs.readFile(dbCarrito, 'utf-8');
			return JSON.parse(productos)
		} catch (error) {
			console.log(error);
			return [];
		}
	}
}