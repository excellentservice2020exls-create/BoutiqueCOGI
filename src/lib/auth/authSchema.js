import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caracteres'),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, 'Le prenom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
  phone: z.string().regex(/^\+?[0-9\s-]{8,}$/, 'Numero de telephone invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caracteres').regex(/[A-Z]/, 'Au moins une majuscule').regex(/[a-z]/, 'Au moins une minuscule').regex(/[0-9]/, 'Au moins un chiffre'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, { message: "Vous devez accepter les conditions d'utilisation" }),
}).refine((data) => data.password === data.confirmPassword, { message: 'Les mots de passe ne correspondent pas', path: ['confirmPassword'] })

export const profileSchema = z.object({
  firstName: z.string().min(2, 'Le prenom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  phone: z.string().regex(/^\+?[0-9\s-]{8,}$/, 'Numero de telephone invalide'),
  address: z.string().optional(),
  city: z.string().optional(),
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caracteres'),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, { message: 'Les mots de passe ne correspondent pas', path: ['confirmNewPassword'] })