import expess from 'express';
import morgan from 'morgan';
import { router } from './routes.js';

const app = expess();

app.set('port', 3000);

app.use(morgan('dev'));

app.use(expess.json());

app.use(router);

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})