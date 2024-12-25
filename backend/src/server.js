const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '112233',
    database: 'likeme',
    allowExitOnIdle: true
  });


app.get('/posts', async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM posts;');
    res.json({
        posts: rows
    });

})

app.post('/posts', async(req, res) => {
    const { titulo, img, descripcion } = req.body;
    if (titulo && img && descripcion) {
        const consulta = `INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, 0)`;
        const values = [titulo, img, descripcion];
        const insert = await pool.query(consulta,values);
        if (insert) {
            res.status(201).json(insert.rows);
        }
    }
})


app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});