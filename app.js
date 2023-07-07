import express from 'express';
import { generateToken, authToken } from './src/utils/jwt.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const users = [];

app.post('/register', (req, res) => {
    const {name, email, password } = req.body;
    const user = users.find(user => user.email === email);
    if(user) return res.status(400).send({ status: 'error', error: 'User already exists'});
    const newUser = {
        name,
        email,
        password
    };
    users.push(newUser)

    res.send({ status: 'success', msg: 'User registered succesfully'})
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if(!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials'});
    const access_token = generateToken(user);
    res.send({status: 'success', access_token})
})

app.get('/datos', authToken ,(req, res) => {
    res.send({status: 'success', payload: req.user})
})

const server = app.listen(8080, () =>  console.log('Server running'))