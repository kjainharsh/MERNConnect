const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must be no more than 255 characters" }),
    password: z
        .string({ required_error: "Password is Required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(1024, { message: "Password must be no more than 1024 characters" }),
});

//const signUpSchema = z.object({
const signUpSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is Required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must be no more than 255 characters" }),
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must be no more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is Required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters" })
        .max(20, { message: "Phone must be no more than 20 characters" }),
    password: z
        .string({ required_error: "Password is Required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(1024, { message: "Password must be no more than 1024 characters" }),
});

module.exports = {signUpSchema,loginSchema};
