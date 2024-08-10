import { pool } from "./database.js";

class LibroController {

    //obtenemos todos los libros
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (err) {
            res.json({ error: err.message });
        }
    }

    //obtenemos los libros por id
    async getOne(req, res){
        const {id}= req.params;
        try{
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (result.length === 0){
                return res.json({error: 'Libro no encontrado'});
            }
            res.json(result);
        }catch(err){
            res.json({error: err.message});
        }
    }

    //añadir libros
    async add(req, res){
        const libro = req.body;
        
        try{
            const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES(?, ?, ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
            res.json({"id insertado": result.insertId});
        }catch (err) {
            res.json({error: err.message})
        } 
    }


}

export const libro = new LibroController();