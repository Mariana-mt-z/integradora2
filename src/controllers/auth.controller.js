import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json(["Este correo ya existe"]);

        const newUser = new User({
            username,
            email,
            password,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved.id })
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) throw new Error("Las credenciales son inválidas");

        // Comparar la contraseña en texto plano
        if (password !== userFound.password) throw new Error("Las credenciales son inválidas");

        const token = await createAccessToken({ id: userFound.id });
        res.cookie('token', token, {
            // sameSite: 'none', 
            // secure: true,
            // httpOnly: false
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const logout = (req, res) => {
    res.cookie("token", "",{
        expires: new Date(0),
      });
      return res.sendStatus(200);
    }

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "No autorizado " });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado " });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};


export const updateUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
      const userUpdated = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username, password, email },
        { new: true }
      );
      return res.json(userUpdated);
    } catch (error) {
        return res.status(500).json({ message: 'El correo ya esta en uso' });
    }
  };





  export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
        res.cookie('token', '', { expires: new Date(0) });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };