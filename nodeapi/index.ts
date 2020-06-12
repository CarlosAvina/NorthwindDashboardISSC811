import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import AuthToken from './middlewares/token.middleware';
import ENV from './environments/env.production';

const app = express();
const token = AuthToken();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.get('/api/auth/test', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        msg: 'Metodo de prueba funciona! :D'
    });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    console
    const mockUser = {
        id: 1,
        username: "juan",
        password: "123",
        roles: ['admin', 'user']
    };

    if (username === mockUser.username && password === mockUser.password) {

        jwt.sign(mockUser, 'secretWamas', { expiresIn: 120 }, (err, token) => {
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
        res.status(403).json({
            ok: false,
            msg: 'El usuario o password son incorrectos'
        });
    }
});

app.get('/api/auth/getCustomers', token.verify, (req: Request, res: Response) => {

    const { authUser } = req.body;

    const mockCustomer = [
        { clave: 'ASDJ', nombre: 'American AxeL' },
        { clave: 'GDJK', nombre: 'Grupo Pirelli' },
        { clave: 'IENK', nombre: 'General Motros' }
    ];

    res.status(200).json({
        ok: true,
        msg: 'Permiso concedido',
        data: mockCustomer,
        user: authUser
    })
});

app.listen(ENV.API.PORT, () => {
    console.log(`Servidor de APIs funcionando correctamente en el puerto ${ENV.API.PORT}`);
});