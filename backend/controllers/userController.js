const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require('../middlewares/restError.js');
const generateToken = require("../middlewares/generateToken.js");
const { hashPassword, comparePassword } = require("../middlewares/password.js");
const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Verifica se l'email è già registrata
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new RestError('Email già registrata', 400);
        }

        const data = {
            email,
            name,
            password: await hashPassword(password),
        };

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name
        });

        res.json({
            token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        errorHandler(err, req, res);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        const err = new RestError('Email o password errati', 400);

        if (!user) {
            throw err;
        }

        const passwordOk = await comparePassword(password, user.password);
        if (!passwordOk) {
            throw err;
        }

        const token = generateToken({
            email: user.email,
            name: user.name
        });

        res.json({
            token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

module.exports = {
    register,
    login
};
