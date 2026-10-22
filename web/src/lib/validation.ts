export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

/** Acepta números con prefijo internacional opcional, espacios, puntos o guiones; 7–15 dígitos. */
export function isValidPhone(value: string): boolean {
  const digits = value.trim().replace(/[\s().-]/g, '')
  return /^\+?\d{7,15}$/.test(digits)
}
