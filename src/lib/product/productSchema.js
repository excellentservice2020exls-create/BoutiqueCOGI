import { z } from 'zod'

export const productSchema = z.object({
  sku: z.string().min(3, 'La reference doit contenir au moins 3 caracteres'),
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets'),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isOnSale: z.boolean().default(false),
  catalogIds: z.array(z.string()).max(3, 'Maximum 3 catalogues'),
  categoryIds: z.array(z.string()).max(4, 'Maximum 4 categories'),
})

export const productVariantSchema = z.object({
  sku: z.string().min(3, 'La reference est requise'),
  color: z.string().optional(),
  size: z.string().optional(),
  dimensions: z.string().optional(),
  price: z.number().min(0, 'Le prix doit etre positif'),
  stock: z.number().min(0, 'Le stock doit etre positif'),
  status: z.enum(['IN_STOCK', 'OUT_OF_STOCK', 'PREORDER']),
  isDefault: z.boolean().default(false),
})

export const productImageSchema = z.object({
  url: z.string().url('URL d'image invalide'),
  alt: z.string().optional(),
  sortOrder: z.number().default(0),
  isMain: z.boolean().default(false),
})