import { z } from 'zod';

// Schema de la ubicación (compartido por origin y location)
const locationSchema = z.object({
  name: z.string(),
  url: z.string(),
});

// Schema de un personaje individual
export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  // z.enum valida que el valor sea exactamente uno de estos strings
  status: z.enum(['Alive', 'Dead', 'unknown']),
  species: z.string(),
  type: z.string(),
  gender: z.enum(['Female', 'Male', 'Genderless', 'unknown']),
  origin: locationSchema,
  location: locationSchema,
  image: z.string().url(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

// Schema para la respuesta paginada de /character
export const characterListSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(characterSchema),
});

// z.infer<> extrae el tipo TypeScript del schema Zod.
// Esto evita duplicar la interfaz a mano — el tipo se deriva del schema.
export type CharacterFromSchema = z.infer<typeof characterSchema>;
export type CharacterListFromSchema = z.infer<typeof characterListSchema>;