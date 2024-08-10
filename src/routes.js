import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

//ruta para obterner todos los libros
router.get('/libros', libro.getAll);

//ruta para obtener libros por la id
router.get('/libro/:id', libro.getOne);

//ruta para agregar libros
router.post('/libro', libro.add);