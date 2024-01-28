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


let array = [];
const today = new Date();
const oneWeekAgo = new Date(today);
oneWeekAgo.setDate(today.getDate() - 7); 
const query = 'SELECT tramonto, ROUND(AVG(temperatura)::numeric, 2) as temperatura_media, MIN(temperatura) as temperatura_minima, MAX(temperatura) as temperatura_massima FROM previsioni WHERE tramonto > $1 GROUP BY tramonto ORDER BY tramonto';
pool.query(query, [oneWeekAgo], (err, result) => {
    array.push(result.rows);
});

pool.end


app.get('/', (req, res) => {


    res.json(array);


})
