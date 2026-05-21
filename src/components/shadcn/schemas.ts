import { z } from "zod"

export const emailSchema = z.string().email("Invalid email address")

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const confirmPasswordSchema = (password: string) =>
  z.string().refine((val) => val === password, {
    message: "Passwords do not match",
  })

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters")

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")

export const urlSchema = z.string().url("Invalid URL").optional().or(z.literal(""))

export const cpfSchema = z.string().refine(
  (val) => {
    const cpf = val.replace(/\D/g, "")
    return cpf.length === 11
  },
  { message: "CPF must have 11 digits" }
)

export const cnpjSchema = z.string().refine(
  (val) => {
    const cnpj = val.replace(/\D/g, "")
    return cnpj.length === 14
  },
  { message: "CNPJ must have 14 digits" }
)

export const cepSchema = z.string().refine(
  (val) => {
    const cep = val.replace(/\D/g, "")
    return cep.length === 8
  },
  { message: "CEP must have 8 digits" }
)

export const dateSchema = z.date({
  message: "Invalid date format or required",
})

export const dateRangeSchema = z.object({
  from: dateSchema,
  to: dateSchema,
}).refine(
  (data) => data.from <= data.to,
  { message: "End date must be after start date", path: ["to"] }
)

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
)

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
)

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  category: z.string().optional(),
  filters: z.record(z.string(), z.string()).optional(),
})

export const numberRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
}).refine(
  (data) => {
    if (data.min !== undefined && data.max !== undefined) {
      return data.min <= data.max
    }
    return true
  },
  { message: "Minimum value must be less than or equal to maximum value" }
)
