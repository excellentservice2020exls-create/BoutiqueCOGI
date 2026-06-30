import { z } from 'zod'

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().min(1).max(99),
})

export const orderSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  email: z.string().email('Email invalide').optional(),
  phone: z.string().regex(/^\+?[0-9\s-]{8,}$/, 'Telephone invalide'),
  street: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  notes: z.string().optional(),
})