require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173','http://localhost:4000', 'https://perdin-api.vercel.app/', 'https://perdin-vue.vercel.app/'];

const authRoutes = require('./routes/auth');
const perdinRoutes = require('./routes/perdin');
const kotaRoutes = require('./routes/kota');

const logRequest = require('./middleware/log');
const authToken = require('./middleware/auth');

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Content-Length', 'Authorization'],
}));


app.use(logRequest);
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("perdin api")
});

app.use('/auth', authRoutes);
// app.use(authToken.authenticateToken);

app.use('/perdin', perdinRoutes);

app.use('/kota', kotaRoutes);


app.listen(PORT, ()=> {
    console.log(`Server berhasil running di port ${PORT}`)
})
