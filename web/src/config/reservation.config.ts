/** Reglas del sistema de reservas. Todo configurable desde un único sitio. */
export const reservationConfig = {
  /** Máximo de comensales reservables online; por encima, se pide llamar. */
  maxPartySizeOnline: 6,
  /** Días vista para poder reservar desde hoy. */
  bookingWindowDays: 60,
  /** Intervalo entre franjas horarias ofrecidas. */
  slotIntervalMinutes: 30,
  /** Duración que ocupa una reserva en la mesa. */
  reservationDurationMinutes: 90,
}
