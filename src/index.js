import expess from 'express';
import morgan from 'morgan';

const app = expess();

app.set('port', 3000);

app.use(morgan('dev'));

app.use(expess.json());

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})