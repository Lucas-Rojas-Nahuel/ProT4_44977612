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
            //preguntamos si la lista esta vacia 
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

    //actualizar libro
    async update(req, res){
        const libro= req.body;

        try{
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]);
            //preguntamos si hubo algunas actualización de libro
            if (result.affectedRows === 0){
                return res.json({error: 'Libro no encontrado'});
            }

            res.json({'Libro actualizado': result.changedRows});
        }catch (err){
            res.json({error: err.meassge})
        }
    }

    //Eliminar libro 
    async delete(req, res){
        const libro= req.body;
        const {ISBN}= req.params;

        try{
            const[result]= await pool.query('DELETE FROM libros WHERE ISBN = ?', [libro.ISBN])
            //preguntamos si hubo libros elininados
            if (result.affectedRows === 0){
                return res.json({error: 'Libro no encontrado'})
            }

            res.json({'Libro eliminado': result.affectedRows})
        }catch(err){
            res.json({error: err.meassge});
        }
    }

    
}

export const libro = new LibroController();