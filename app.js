const express = require('express');
const path = require('path'); 
const methodOverride = require('method-override');
const cookies = require('cookie-parser');

const port = 3001;

const app = express();

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

const productRouter = require('./src/routes/productRoutes');
const usersRouter = require('./src/routes/usersRoutes');

const publicPath = path.resolve(__dirname, 'public');


const session = require('express-session');
app.use(session({
    secret: 'Ultra secreto',
    resave: false,
    saveUninitialized: true,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.set('views', path.resolve(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(publicPath));
app.use(methodOverride('method'));
app.use(express.json());


app.use('/products', productRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    res.status(404).render("404", { title: "Jabba's Palace - Not found" });
    next();
});


app.listen(port, ()=>console.log(`servidor corriendo en el puerto ${port}`));