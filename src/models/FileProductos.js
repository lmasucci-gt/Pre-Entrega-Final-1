import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export class File{
    constructor(file){
        this.file = `${__dirname}/Productos.txt`
    }
    getData(){
        try{
            const data = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(data);
        } catch (err){
            console.log(err);
            return [];
        }
    }
    createData(producto){
        const data = this.read();
        producto.id = data.length + 1;
        data.push(producto);
        try{
            fs.writeFile(this.file, JSON.stringify(data, null, '\t'), () => {});
            return true;
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
}

export default new File('Productos.txt');