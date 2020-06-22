import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import AuthToken from './middlewares/token.middleware';

import MongoDBHelper from './helpers/mongodb.helper';

import ENV from './environments/env.production';

const app = express();
const token = AuthToken();
const mongoDB = MongoDBHelper.getInstance(ENV.MONGODB);
// const hash = bcrypt();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.get('/api/auth/test', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        msg: 'Metodo de prueba funciona! :D'
    });
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await mongoDB.db.collection('users').findOne({ username: username });
    console.log(user);
    if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(403).json({
                ok: false,
                msg: 'Lo sentimos, usuario o contraseña no validos'
            });
        }

        const userValid = {
            uid: user._id,
            username: user.username,
            fullName: user.fullName,
            urlPhoto: user.urlPhoto,
            rol: user.rol
        }

        jwt.sign(userValid, 'secretWamas', { expiresIn: 120 }, (err, token) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Ocurrio un error',
                    err
                });
            }

            res.status(200).json({
                ok: true,
                msg: 'El usuario ha sido autenticado',
                token
            });
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: 'Lo sentimos, usuario o contraseña no validos'
        });
    }
});

app.get('/api/auth/verify', token.verify, (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        msg: 'Permiso concedido'
    });
});

app.post('/api/auth/createUser', async (req: Request, res: Response) => {
    const { username, password, fullName, urlPhoto, rol } = req.body;

    const newUser = {
        username, password: bcrypt.hashSync(password, 10), fullName, urlPhoto, rol
    }

    const insert = await mongoDB.db.collection('users').insertOne(newUser);

    res.status(200).json({
        ok: true,
        msg: 'Usuario creado de forma correcta',
        uid: insert.insertedId
    });
});

app.listen(ENV.API.PORT, async () => {
    console.log(`Servidor de APIs funcionando correctamente en el puerto ${ENV.API.PORT}`);
    await mongoDB.connect();
});

process.on('unhandledRejection', async (err: any) => {
    await mongoDB.close();
    process.exit();
});