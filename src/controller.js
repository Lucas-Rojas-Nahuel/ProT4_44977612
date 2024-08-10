import { pool } from "./database.js";

class LibroController {

    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (err) {
            res.json({ error: err.message });
        }
    }

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


}

export const libro = new LibroController();