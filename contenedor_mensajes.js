const fs = require('fs');

class Contenedor2 {
    constructor(mensajes) {
        this.mensajes = mensajes;
    }

    async save(sms) {
        try {
            let data = await this.readFile();
            sms.id = this.buildId(data);

            data.push(sms);
            this.writeFile(data);
            return sms.id;
        } catch (error) {
            console.error(error);
        }
    }

    getAll() {
        return this.readFile();
    }

    async deleteAll() {
        this.writeFile([]);
    }

    async readFile() {
        
        return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
    }

    async writeFile(data) {
        const str= JSON.stringify(data)
        await fs.promises.writeFile(this.filename, str);
    }

    buildId(data) {
        try {
            if (data.length === 0) {
                return 1;
            } else {
                data.sort((a, b) => (a.id > b.id ? 1 : -1));
                return data[data.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Contenedor2;