import express from 'express';
const app = express()
const port = 3000;
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'dario',
    host: '193.70.115.204',
    database: 'meteo',
    password: 'HotDingo627',
    port: 5432,
});


app.listen(port, () => {
    console.log(`server running`);

})


// Middleware per gestire i controlli CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});






let array = [];
const today = new Date();
const oneWeekAgo = new Date(today);
oneWeekAgo.setDate(today.getDate() - 7);  // Sottrai 7 giorni per ottenere una settimana fa
const query = 'SELECT tramonto, MAX(temperatura) as temperatura_massima FROM previsioni WHERE tramonto > $1 GROUP BY tramonto';
pool.query(query, [oneWeekAgo], (err, result) => {
    array.push(result.rows);
});

pool.end


app.get('/', (req, res) => {


    res.json(array);


})
