import type { Bilingual } from '@/types/common'

// Local
import localComedor640 from '@/assets/images/local/local-comedor-640.webp'
import localComedor960 from '@/assets/images/local/local-comedor-960.webp'
import localTerraza640 from '@/assets/images/local/local-terraza-640.webp'
import localTerraza960 from '@/assets/images/local/local-terraza-960.webp'
import localLampara640 from '@/assets/images/local/local-lampara-cristal-640.webp'
import localLampara960 from '@/assets/images/local/local-lampara-cristal-960.webp'
import localJardin640 from '@/assets/images/local/local-jardin-buda-640.webp'
import localJardin960 from '@/assets/images/local/local-jardin-buda-960.webp'
import localFarolillo640 from '@/assets/images/local/local-farolillo-640.webp'
import localFarolillo960 from '@/assets/images/local/local-farolillo-960.webp'
import localUkiyoe640 from '@/assets/images/local/local-detalle-ukiyo-e-640.webp'
import localUkiyoe960 from '@/assets/images/local/local-detalle-ukiyo-e-960.webp'

// Platos
import tempuraVeg480 from '@/assets/images/dishes/tempura-vegetales-480.webp'
import tempuraVeg768 from '@/assets/images/dishes/tempura-vegetales-768.webp'
import tempuraLangostinos480 from '@/assets/images/dishes/tempura-langostinos-480.webp'
import tempuraLangostinos768 from '@/assets/images/dishes/tempura-langostinos-768.webp'
import nasuMiso480 from '@/assets/images/dishes/nasu-miso-480.webp'
import nasuMiso768 from '@/assets/images/dishes/nasu-miso-768.webp'
import esparragos480 from '@/assets/images/dishes/esparragos-soja-jengibre-480.webp'
import esparragos768 from '@/assets/images/dishes/esparragos-soja-jengibre-768.webp'
import champinones480 from '@/assets/images/dishes/champinones-mantequilla-soja-480.webp'
import champinones768 from '@/assets/images/dishes/champinones-mantequilla-soja-768.webp'
import sashimi480 from '@/assets/images/dishes/sashimi-salmon-480.webp'
import sashimi768 from '@/assets/images/dishes/sashimi-salmon-768.webp'
import ceviche480 from '@/assets/images/dishes/ceviche-langostinos-480.webp'
import ceviche768 from '@/assets/images/dishes/ceviche-langostinos-768.webp'
import maki480 from '@/assets/images/dishes/maki-sushi-480.webp'
import maki768 from '@/assets/images/dishes/maki-sushi-768.webp'
import tataki480 from '@/assets/images/dishes/tataki-res-480.webp'
import tataki768 from '@/assets/images/dishes/tataki-res-768.webp'
import porkbelly480 from '@/assets/images/dishes/porkbelly-480.webp'
import porkbelly768 from '@/assets/images/dishes/porkbelly-768.webp'
import panacotta480 from '@/assets/images/dishes/panacotta-480.webp'
import panacotta768 from '@/assets/images/dishes/panacotta-768.webp'
import crumble480 from '@/assets/images/dishes/crumble-manzana-480.webp'
import crumble768 from '@/assets/images/dishes/crumble-manzana-768.webp'

export interface GalleryImage {
  id: string
  category: 'local' | 'plato'
  thumb: string
  full: string
  alt: Bilingual
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'local-comedor',
    category: 'local',
    thumb: localComedor640,
    full: localComedor960,
    alt: { es: 'Mesa del comedor junto al ventanal del jardín', en: 'Dining table by the garden window' },
  },
  {
    id: 'plato-tataki',
    category: 'plato',
    thumb: tataki480,
    full: tataki768,
    alt: { es: 'Tataki de lomo bajo de res', en: 'Beef sirloin tataki' },
  },
  {
    id: 'plato-sashimi',
    category: 'plato',
    thumb: sashimi480,
    full: sashimi768,
    alt: { es: 'Sashimi de salmón con ponzu y trufa', en: 'Salmon sashimi with ponzu and truffle' },
  },
  {
    id: 'local-terraza',
    category: 'local',
    thumb: localTerraza640,
    full: localTerraza960,
    alt: { es: 'Terraza exterior entre los árboles', en: 'Outdoor terrace among the trees' },
  },
  {
    id: 'plato-maki',
    category: 'plato',
    thumb: maki480,
    full: maki768,
    alt: { es: 'Maki sushi de salmón, espárrago y chilli mayo', en: 'Salmon, asparagus and chilli mayo maki' },
  },
  {
    id: 'local-lampara',
    category: 'local',
    thumb: localLampara640,
    full: localLampara960,
    alt: { es: 'Lámpara de cristal mosaico en tonos ámbar', en: 'Amber mosaic glass lamp' },
  },
  {
    id: 'plato-ceviche',
    category: 'plato',
    thumb: ceviche480,
    full: ceviche768,
    alt: { es: 'Ceviche de langostinos con leche de coco', en: 'Prawn ceviche with coconut milk' },
  },
  {
    id: 'plato-porkbelly',
    category: 'plato',
    thumb: porkbelly480,
    full: porkbelly768,
    alt: { es: 'Panceta de cerdo con miso de chipotle', en: 'Pork belly with chipotle miso' },
  },
  {
    id: 'local-jardin',
    category: 'local',
    thumb: localJardin640,
    full: localJardin960,
    alt: { es: 'Figura de Buda en el jardín', en: 'Buddha figure in the garden' },
  },
  {
    id: 'plato-tempura-langostinos',
    category: 'plato',
    thumb: tempuraLangostinos480,
    full: tempuraLangostinos768,
    alt: { es: 'Tempura de langostinos', en: 'Prawn tempura' },
  },
  {
    id: 'plato-nasu-miso',
    category: 'plato',
    thumb: nasuMiso480,
    full: nasuMiso768,
    alt: { es: 'Berenjena gratinada en miso', en: 'Miso-glazed aubergine' },
  },
  {
    id: 'local-farolillo',
    category: 'local',
    thumb: localFarolillo640,
    full: localFarolillo960,
    alt: { es: 'Farolillo de papel entre la vegetación', en: 'Paper lantern among the greenery' },
  },
  {
    id: 'plato-champinones',
    category: 'plato',
    thumb: champinones480,
    full: champinones768,
    alt: { es: 'Champiñones asados con mantequilla y soja', en: 'Roasted mushrooms with butter and soy' },
  },
  {
    id: 'plato-esparragos',
    category: 'plato',
    thumb: esparragos480,
    full: esparragos768,
    alt: { es: 'Espárragos con vinagreta de soja y jengibre', en: 'Asparagus with soy-ginger vinaigrette' },
  },
  {
    id: 'local-ukiyoe',
    category: 'local',
    thumb: localUkiyoe640,
    full: localUkiyoe960,
    alt: { es: 'Detalle de grabados japoneses en la pared', en: 'Detail of Japanese prints on the wall' },
  },
  {
    id: 'plato-tempura-vegetales',
    category: 'plato',
    thumb: tempuraVeg480,
    full: tempuraVeg768,
    alt: { es: 'Tempura de vegetales', en: 'Vegetable tempura' },
  },
  {
    id: 'plato-panacotta',
    category: 'plato',
    thumb: panacotta480,
    full: panacotta768,
    alt: { es: 'Panacotta', en: 'Panna cotta' },
  },
  {
    id: 'plato-crumble',
    category: 'plato',
    thumb: crumble480,
    full: crumble768,
    alt: { es: 'Crumble de manzana', en: 'Apple crumble' },
  },
]
