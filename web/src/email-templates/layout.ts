import { siteConfig } from '@/config/site.config'
import type { Locale } from '@/types/common'

/**
 * Envoltorio HTML compartido por todas las plantillas de email. Usa estilos en
 * línea y etiquetas simples (nada de flexbox/grid) porque es lo que de verdad
 * soportan de forma fiable los clientes de correo.
 *
 * TODO (paso a producción): antes de conectar un proveedor real (p. ej. Resend),
 * conviene probar este HTML en varios clientes (Gmail, Outlook, Apple Mail) y
 * sustituir, si hace falta, por una herramienta pensada para email como
 * react-email o MJML.
 */

const COLORS = {
  ink: '#1a1613',
  inkSoft: '#6b6358',
  accent: '#bc3a2d',
  paper: '#ffffff',
  paperSoft: '#faf7f4',
  line: '#e6e0d8',
}

const footerCopy: Record<Locale, { rights: string; address: string }> = {
  es: { rights: 'Todos los derechos reservados.', address: 'Dirección' },
  en: { rights: 'All rights reserved.', address: 'Address' },
}

export function renderEmailLayout(options: { locale: Locale; title: string; bodyHtml: string }): string {
  const { locale, title, bodyHtml } = options
  const f = footerCopy[locale]
  const year = new Date().getFullYear()

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0; padding:0; background:${COLORS.paperSoft}; font-family: Georgia, 'Times New Roman', serif; color:${COLORS.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.paperSoft}; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background:${COLORS.paper}; border:1px solid ${COLORS.line};">
            <tr>
              <td style="padding: 36px 40px 24px 40px; text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:${COLORS.accent}; width:34px; height:34px; text-align:center; vertical-align:middle; border-radius:4px;">
                      <span style="color:${COLORS.paper}; font-family: Georgia, serif; font-size:18px; font-weight:bold;">I</span>
                    </td>
                    <td style="padding-left:10px; font-family: Georgia, 'Times New Roman', serif; font-size:22px; letter-spacing:0.5px; color:${COLORS.ink};">
                      Izakaya
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <div style="border-top:1px solid ${COLORS.line};"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 40px; font-family: Helvetica, Arial, sans-serif; font-size:15px; line-height:1.65; color:${COLORS.ink};">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 36px 40px; border-top:1px solid ${COLORS.line}; font-family: Helvetica, Arial, sans-serif; font-size:12px; line-height:1.6; color:${COLORS.inkSoft};">
                <p style="margin:0 0 4px 0;"><strong>${siteConfig.name}</strong></p>
                <p style="margin:0 0 4px 0;">${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}</p>
                <p style="margin:0 0 12px 0;">${siteConfig.phone.display} &middot; ${siteConfig.email}</p>
                <p style="margin:0; color:#a39b8e;">&copy; ${year} ${siteConfig.name}. ${f.rights}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function emailButton(label: string, href: string, variant: 'primary' | 'outline' = 'primary'): string {
  const bg = variant === 'primary' ? COLORS.accent : COLORS.paper
  const color = variant === 'primary' ? COLORS.paper : COLORS.ink
  const border = variant === 'primary' ? COLORS.accent : COLORS.ink

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-block; margin: 6px 8px 6px 0;">
    <tr>
      <td style="background:${bg}; border:1px solid ${border}; border-radius:2px;">
        <a href="${href}" style="display:inline-block; padding:12px 22px; font-family: Helvetica, Arial, sans-serif; font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:${color}; text-decoration:none;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`
}

export { COLORS }
