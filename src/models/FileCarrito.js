import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export class File{
    constructor(file){
        this.file = `${__dirname}/Carrito.txt`
    }
    getData(){
        try{
            const data = fs.readFileSync(this.file, 'utf-8');
            return data.length > 0 ? JSON.parse(data) : [];
        } catch (err){
            console.log(err);
            return [];
        }
    }
    createData(producto){
        try{            
            const carrito = fs.readFileSync(this.file, 'utf-8');
            console.log(carrito)
            if (carrito.productos.length <0) {
                const carritoParse = JSON.parse(carrito);            
                carritoParse.productos.push(producto);
            }
            fs.writeFile(this.file, JSON.stringify(carritoParse, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
    updateData(productos){
        try{
            fs.writeFile(this.file, JSON.stringify(productos, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
}

export default new File('Productos.txt');