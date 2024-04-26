// import User from '../models/user.model.js';
// import bcrypt from 'bcryptjs';

// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, email, password } = req.body;

//     try {
//         // Verificar si el usuario existe
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "Usuario no encontrado" });
//         }

//         // Verificar si el correo electrónico ya está en uso por otro usuario
//         if (email && email !== user.email) {
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ message: "El correo electrónico ya está en uso" });
//             }
//         }

//         // Actualizar los campos del usuario
//         if (username) {
//             user.username = username;
//         }
//         if (email) {
//             user.email = email;
//         }
//         if (password) {
//             const passwordHash = await bcrypt.hash(password, 10);
//             user.password = passwordHash;
//         }

//         // Guardar el usuario actualizado en la base de datos
//         const updatedUser = await user.save();

//         // Enviar la respuesta con los detalles del usuario actualizado
//         res.json({
//             id: updatedUser._id,
//             username: updatedUser.username,
//             email: updatedUser.email,
//             createdAt: updatedUser.createdAt,
//             updatedAt: updatedUser.updatedAt,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
