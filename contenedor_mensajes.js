const fs = require('fs');

class Contenedor2 {
    constructor(filename) {
        this.filename = filename;
    }

    async save(mensaje) {
        try {
            let data = await this.readFile();
            data.push(mensaje);    
            await this.writeFile(data);

            return mensaje;
        } catch (error) {
            console.error(error);
        }
    }
    
    getAll() {
        try {
            return this.readFile();
        } catch (error) {
            console.error(error);
        }
    }
    
    async readFile() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
        } catch (error) {
            console.error(error);
        }
    }
    
    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    
}

module.exports = Contenedor2;