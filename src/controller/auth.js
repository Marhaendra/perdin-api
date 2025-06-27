const UsersModel = require('../models/users');
const AuthModel = require('../models/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const {body} = req;
    try {
        await AuthModel.registerUser(body);
        res.status(201).json({
            message: 'CREATE new user success',
            data: body,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error 123",
            serverMessage: error,
        })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UsersModel.getUserByUsername(username);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const userDataObject = user[0];

        const isPasswordValid = await bcrypt.compare(password, userDataObject.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            userId: userDataObject.id,
            username: userDataObject.username,
            role: userDataObject.role
        };

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '3h' });
        
        const userDataForResponse = {
            id: userDataObject.id,
            username: userDataObject.username,
            role: userDataObject.role,
        };
        
        res.json({ token, userData: userDataForResponse });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}