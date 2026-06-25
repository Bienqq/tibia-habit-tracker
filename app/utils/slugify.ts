/** Normalizuje nazwę nawyku do sluga (klucz katalogu rankingu). */
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // usuń znaki diakrytyczne (ą, ę, ó...)
    .replace(/ł/g, 'l') // ł -> l
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
