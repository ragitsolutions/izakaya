import { siteConfig } from '@/config/site.config'
import { legalConfig } from '@/config/legal.config'
import type { Bilingual } from '@/types/common'

export interface LegalSection {
  heading: Bilingual
  paragraphs: Bilingual[]
}

// TODO: confirmar con el cliente/asesoría legal — texto de ejemplo con estructura
// habitual para un Aviso Legal conforme a la LSSI-CE. Revisar antes de publicar.
export const legalNoticeSections: LegalSection[] = [
  {
    heading: { es: '1. Datos identificativos', en: '1. Identification details' },
    paragraphs: [
      {
        es: `En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos: titular, ${legalConfig.companyName} (nombre comercial "${siteConfig.name}"); NIF/CIF, ${legalConfig.taxId}; domicilio, ${legalConfig.registeredAddress}; ${legalConfig.registryInfo}; correo electrónico de contacto, ${siteConfig.email}; teléfono, ${siteConfig.phone.display}.`,
        en: `In compliance with article 10 of Spanish Law 34/2002 on Information Society Services and E-Commerce (LSSI-CE), the following details are provided: owner, ${legalConfig.companyName} (trading as "${siteConfig.name}"); Tax ID, ${legalConfig.taxId}; registered address, ${legalConfig.registeredAddress}; ${legalConfig.registryInfo}; contact email, ${siteConfig.email}; phone, ${siteConfig.phone.display}.`,
      },
    ],
  },
  {
    heading: { es: '2. Objeto', en: '2. Purpose' },
    paragraphs: [
      {
        es: `El presente aviso legal regula el uso del sitio web ${siteConfig.name} (en adelante, "el sitio web"), a través del cual se ofrece información sobre el restaurante, su carta y un sistema de reservas online. El acceso al sitio web es gratuito y supone la aceptación plena de las condiciones recogidas en este aviso legal.`,
        en: `This legal notice governs the use of the ${siteConfig.name} website (the "website"), which provides information about the restaurant, its menu and an online reservation system. Access to the website is free and implies full acceptance of the terms set out in this legal notice.`,
      },
    ],
  },
  {
    heading: { es: '3. Condiciones de uso', en: '3. Terms of use' },
    paragraphs: [
      {
        es: 'El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación aplicable, la buena fe y el orden público. Queda prohibido el uso del sitio web con fines ilícitos o lesivos, o que de cualquier forma puedan causar perjuicio o impedir el normal funcionamiento del sitio web.',
        en: 'Users agree to make appropriate and lawful use of the website, in accordance with applicable law, good faith and public order. Use of the website for unlawful or harmful purposes, or in any way that could cause damage or prevent its normal operation, is prohibited.',
      },
      {
        es: 'El sistema de reservas es una herramienta para facilitar la gestión de mesas del restaurante. La reserva no se considera confirmada hasta que el restaurante la confirma, bien automáticamente, bien tras contacto directo con el cliente.',
        en: 'The reservation system is a tool to help manage the restaurant’s tables. A booking is not considered confirmed until the restaurant confirms it, either automatically or after direct contact with the customer.',
      },
    ],
  },
  {
    heading: { es: '4. Propiedad intelectual e industrial', en: '4. Intellectual and industrial property' },
    paragraphs: [
      {
        es: `Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño, código fuente, carta y demás elementos) son titularidad de ${legalConfig.companyName} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o comunicación pública total o parcial sin autorización expresa.`,
        en: `All content on the website (text, images, logos, design, source code, menu and other elements) is owned by ${legalConfig.companyName} or by third parties who have authorised its use, and is protected by intellectual and industrial property law. Its full or partial reproduction, distribution or public communication without express authorisation is prohibited.`,
      },
    ],
  },
  {
    heading: { es: '5. Responsabilidad', en: '5. Liability' },
    paragraphs: [
      {
        es: `${legalConfig.companyName} no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, interrupciones, virus informáticos, averías o desconexiones en el funcionamiento del sitio web, ni de los causados por un uso inadecuado del mismo. La información de la carta, precios y horarios tiene carácter orientativo y puede variar sin previo aviso.`,
        en: `${legalConfig.companyName} is not liable for damages arising from interference, interruptions, computer viruses, faults or disconnections affecting the website, nor for damages caused by improper use of it. Menu, pricing and opening-hours information is provided for guidance only and may change without notice.`,
      },
    ],
  },
  {
    heading: { es: '6. Legislación aplicable y jurisdicción', en: '6. Governing law and jurisdiction' },
    paragraphs: [
      {
        es: `Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso del sitio web, las partes se someten a los juzgados y tribunales de ${siteConfig.address.city}, salvo que la normativa de consumidores y usuarios establezca otro fuero.`,
        en: `These terms are governed by Spanish law. For any dispute arising from the use of the website, the parties submit to the courts of ${siteConfig.address.city}, unless consumer protection law establishes a different jurisdiction.`,
      },
    ],
  },
]

// TODO: confirmar con el cliente/asesoría legal — texto de ejemplo conforme al
// RGPD y la LOPDGDD. Revisar finalidades, plazos de conservación y encargados
// de tratamiento reales (proveedor de email, hosting, etc.) antes de publicar.
export const privacyPolicySections: LegalSection[] = [
  {
    heading: { es: '1. Responsable del tratamiento', en: '1. Data controller' },
    paragraphs: [
      {
        es: `El responsable del tratamiento de los datos personales recabados a través de este sitio web es ${legalConfig.companyName}, con NIF/CIF ${legalConfig.taxId} y domicilio en ${legalConfig.registeredAddress}. Puede contactar con nosotros para cualquier cuestión relativa a privacidad en ${legalConfig.dpoEmail}.`,
        en: `The controller for the personal data collected through this website is ${legalConfig.companyName}, Tax ID ${legalConfig.taxId}, address ${legalConfig.registeredAddress}. You can contact us for any privacy-related question at ${legalConfig.dpoEmail}.`,
      },
    ],
  },
  {
    heading: { es: '2. ¿Qué datos tratamos y con qué finalidad?', en: '2. What data do we process and why?' },
    paragraphs: [
      {
        es: 'A través del formulario de reservas tratamos: nombre, email, teléfono, nº de comensales, fecha y hora de la reserva, preferencia de zona y, si el cliente lo indica, alergias o intolerancias alimentarias. Estos datos se usan exclusivamente para gestionar la reserva, enviar las confirmaciones y recordatorios correspondientes, y atender cualquier incidencia relacionada.',
        en: 'Through the reservation form we process: name, email, phone number, party size, booking date and time, seating preference and, if the customer provides it, food allergies or intolerances. This data is used exclusively to manage the booking, send the corresponding confirmations and reminders, and handle any related issue.',
      },
      {
        es: 'Los datos sobre alergias o intolerancias tienen la consideración de datos relativos a la salud. Se recaban únicamente con el consentimiento explícito del cliente al marcar la casilla de aceptación del formulario, y se usan solo para la preparación adecuada del servicio en sala y cocina.',
        en: 'Data about allergies or intolerances is considered health-related data. It is collected only with the customer’s explicit consent when checking the form’s acceptance box, and is used solely to prepare the dining room and kitchen service appropriately.',
      },
    ],
  },
  {
    heading: { es: '3. Legitimación', en: '3. Legal basis' },
    paragraphs: [
      {
        es: 'La base legal para el tratamiento de los datos de la reserva es la ejecución de una relación precontractual/contractual (la propia reserva de mesa) y, en el caso de los datos de salud (alergias), el consentimiento explícito del interesado.',
        en: 'The legal basis for processing booking data is the performance of a pre-contractual/contractual relationship (the table booking itself) and, for health data (allergies), the explicit consent of the data subject.',
      },
    ],
  },
  {
    heading: { es: '4. ¿Durante cuánto tiempo conservamos los datos?', en: '4. How long do we keep the data?' },
    paragraphs: [
      {
        es: 'Los datos de la reserva se conservan durante el tiempo necesario para gestionarla y, posteriormente, durante los plazos legales de prescripción de responsabilidades que pudieran derivarse de la relación con el cliente.',
        en: 'Booking data is kept for as long as necessary to manage the booking and, afterwards, for the legal limitation periods applicable to any liability that could arise from the relationship with the customer.',
      },
    ],
  },
  {
    heading: { es: '5. ¿A qué destinatarios se comunican los datos?', en: '5. Who receives the data?' },
    paragraphs: [
      {
        es: `No se ceden datos a terceros salvo obligación legal. Determinados proveedores tecnológicos (como el servicio de envío de emails o el proveedor de hosting, ${legalConfig.hostingProvider}) acceden a los datos como encargados de tratamiento, en los términos del artículo 28 RGPD, exclusivamente para prestar el servicio contratado.`,
        en: `Data is not shared with third parties except where legally required. Certain technology providers (such as the email delivery service or the hosting provider, ${legalConfig.hostingProvider}) access the data as data processors, under article 28 GDPR, solely to provide the contracted service.`,
      },
    ],
  },
  {
    heading: { es: '6. ¿Cuáles son sus derechos?', en: '6. What are your rights?' },
    paragraphs: [
      {
        es: `Cualquier persona tiene derecho a obtener confirmación sobre si en ${siteConfig.name} estamos tratando sus datos personales, y a acceder a ellos, rectificarlos, solicitar su supresión, limitación u oposición al tratamiento, y a la portabilidad de los datos, escribiendo a ${legalConfig.dpoEmail}. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.`,
        en: `Anyone has the right to confirm whether ${siteConfig.name} is processing their personal data, and to access, rectify or request erasure of it, to request restriction of or object to processing, and to data portability, by writing to ${legalConfig.dpoEmail}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es) if you believe the processing does not comply with current regulations.`,
      },
    ],
  },
  {
    heading: { es: '7. Procedencia de los datos', en: '7. Source of the data' },
    paragraphs: [
      {
        es: 'Los datos tratados proceden directamente del propio interesado, a través del formulario de reservas del sitio web o de una reserva gestionada por teléfono por el personal del restaurante.',
        en: 'The data processed comes directly from the data subject, through the website’s reservation form or a booking handled by phone by restaurant staff.',
      },
    ],
  },
]

// TODO: confirmar con el cliente — ajustar la tabla de cookies si se añade un
// proveedor de analítica real (p. ej. Google Analytics) antes de publicar.
export const cookiePolicySections: LegalSection[] = [
  {
    heading: { es: '1. ¿Qué son las cookies?', en: '1. What are cookies?' },
    paragraphs: [
      {
        es: 'Las cookies son pequeños archivos de texto que un sitio web guarda en el navegador del usuario para recordar información sobre su visita, como el idioma elegido o las preferencias de privacidad.',
        en: 'Cookies are small text files that a website stores in the user’s browser to remember information about their visit, such as the chosen language or privacy preferences.',
      },
    ],
  },
  {
    heading: { es: '2. ¿Qué cookies utiliza este sitio web?', en: '2. What cookies does this website use?' },
    paragraphs: [
      {
        es: 'Este sitio web utiliza cookies propias, necesarias para su funcionamiento, y, solo si el usuario las acepta expresamente, cookies analíticas. No se utilizan cookies de publicidad ni de seguimiento de terceros.',
        en: 'This website uses first-party cookies that are necessary for it to work and, only if the user expressly accepts them, analytics cookies. No advertising or third-party tracking cookies are used.',
      },
    ],
  },
  {
    heading: { es: '3. Cómo gestionar las cookies', en: '3. How to manage cookies' },
    paragraphs: [
      {
        es: 'Puedes cambiar tu decisión sobre las cookies analíticas en cualquier momento desde el enlace "Cookies" del pie de página, que vuelve a abrir el panel de preferencias. También puedes eliminar o bloquear las cookies desde la configuración de tu navegador; ten en cuenta que bloquear las cookies necesarias puede afectar al funcionamiento de la web.',
        en: 'You can change your decision about analytics cookies at any time from the "Cookies" link in the footer, which reopens the preferences panel. You can also delete or block cookies from your browser settings; note that blocking necessary cookies may affect how the site works.',
      },
    ],
  },
]

export interface CookieTableRow {
  name: string
  provider: string
  purpose: Bilingual
  duration: Bilingual
  type: 'necessary' | 'analytics'
}

export const cookieTable: CookieTableRow[] = [
  {
    name: 'izakaya:lang',
    provider: siteConfig.name,
    purpose: { es: 'Recuerda el idioma elegido (ES/EN).', en: 'Remembers the chosen language (ES/EN).' },
    duration: { es: 'Persistente', en: 'Persistent' },
    type: 'necessary',
  },
  {
    name: 'izakaya:cookie-consent',
    provider: siteConfig.name,
    purpose: {
      es: 'Guarda la decisión del usuario sobre el uso de cookies.',
      en: 'Stores the user’s decision about cookie usage.',
    },
    duration: { es: 'Persistente', en: 'Persistent' },
    type: 'necessary',
  },
  {
    name: '_ga / _gid',
    // TODO: confirmar con el cliente si se activará Google Analytics (u otra
    // herramienta de analítica); por ahora estas cookies no están activas.
    provider: 'Google Analytics (ejemplo, no activo)',
    purpose: {
      es: 'Estadísticas de uso anónimas y agregadas, solo si el usuario las acepta.',
      en: 'Anonymous, aggregated usage statistics, only if the user accepts them.',
    },
    duration: { es: 'Hasta 24 meses', en: 'Up to 24 months' },
    type: 'analytics',
  },
]
