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
    firstCarrito(carrito){
        try{      
            fs.writeFile(this.file, JSON.stringify(carrito, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
    createData(carrito){
        try{  
            fs.writeFile(this.file, JSON.stringify(carrito, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
    updateData(carrito){
        try{
            fs.writeFile(this.file, JSON.stringify(carrito, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
}

export default new File('Productos.txt');