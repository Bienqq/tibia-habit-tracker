import { z } from 'zod'

/** Walidacja nazwy gracza (nick). */
export const usernameSchema = z
  .string()
  .trim()
  .min(2, 'Nick musi mieć co najmniej 2 znaki')
  .max(20, 'Nick może mieć maksymalnie 20 znaków')
  .regex(/^[\p{L}\p{N} _-]+$/u, 'Dozwolone: litery, cyfry, spacja, _ oraz -')

/** Walidacja nazwy nawyku. */
export const habitNameSchema = z
  .string()
  .trim()
  .min(3, 'Nazwa musi mieć co najmniej 3 znaki')
  .max(40, 'Nazwa może mieć maksymalnie 40 znaków')

/**
 * Zwraca pierwszy komunikat błędu walidacji albo null, gdy wartość poprawna.
 */
export function firstError(
  schema: z.ZodType<unknown>,
  value: unknown,
): string | null {
  const result = schema.safeParse(value)
  if (result.success) return null
  return result.error.issues[0]?.message ?? 'Nieprawidłowa wartość'
}
