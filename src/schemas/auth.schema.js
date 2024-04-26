import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido ",
  }),
  email: z
    .string({
      required_error: "El correo es requerido ",
    })
    .email({
      message: "Correo invalido ",
    }),
  password: z
    .string({
      required_error: "La contraseñas es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "El correo es requerido ",
  }).email({
    message: "Las credenciales son invalidas "
  }),
  password: z.string({
    required_error: "La contraseñas es requerida",
  }).min(6,{
    message: "Las credenciales son invalidas"
  }),
});