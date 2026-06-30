import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet est requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caracteres'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Email invalide'),
})