const express = require('express');
const path = require('path'); 
const methodOverride = require('method-override');

const port = 3001;

const app = express();

const productRouter = require('./src/routes/productRoutes');
const usersRouter = require('./src/routes/usersRoutes');

const publicPath = path.resolve(__dirname, 'public');

app.set('views', path.resolve(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(publicPath));
app.use(methodOverride('method'));
app.use(express.json());

app.use('/products', productRouter);
app.use('/users', usersRouter);


app.listen(port, ()=>console.log(`servidor corriendo en el puerto ${port}`));