import type { Bilingual } from '@/types/common'

// Fotos de plato
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
import carpaccio480 from '@/assets/images/dishes/carpaccio-480.webp'
import carpaccio768 from '@/assets/images/dishes/carpaccio-768.webp'
import tataki480 from '@/assets/images/dishes/tataki-res-480.webp'
import tataki768 from '@/assets/images/dishes/tataki-res-768.webp'
import porkbelly480 from '@/assets/images/dishes/porkbelly-480.webp'
import porkbelly768 from '@/assets/images/dishes/porkbelly-768.webp'
import panacotta480 from '@/assets/images/dishes/panacotta-480.webp'
import panacotta768 from '@/assets/images/dishes/panacotta-768.webp'
import crumble480 from '@/assets/images/dishes/crumble-manzana-480.webp'
import crumble768 from '@/assets/images/dishes/crumble-manzana-768.webp'

// NOTA sobre alérgenos: se han marcado los iconos presentes en la carta original
// (assets-originales/Menu.png) más los ingredientes citados explícitamente en la
// descripción de cada plato (p. ej. "soja", "langostinos", "salmón", "mayo").
// TODO: confirmar con cocina la lista definitiva de alérgenos de cada plato
// (elaboraciones, trazas y posibles cambios de proveedor no están reflejados aquí).

export interface MenuCategory {
  id: string
  name: Bilingual
  description: Bilingual
}

export interface MenuDish {
  id: string
  categoryId: string
  name: Bilingual
  description: Bilingual
  price: number
  allergens: string[]
  image: { thumb: string; full: string }
  /** Plato no presente en la foto de carta aportada; datos de ejemplo. */
  isExample?: boolean
  /** Destacado por la cocina — se muestra con una etiqueta de "recomendado". */
  recommended?: boolean
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'para-compartir',
    name: { es: 'Para compartir', en: 'To share' },
    description: {
      es: 'Platos pensados para el centro de la mesa, al ritmo pausado del izakaya.',
      en: 'Dishes meant for the centre of the table, at the unhurried pace of an izakaya.',
    },
  },
  {
    id: 'crudos',
    name: { es: 'Crudos', en: 'Raw' },
    description: {
      es: 'Pescado y marisco de mercado, con cortes y aliños de precisión.',
      en: 'Market fish and seafood, with precise cuts and dressings.',
    },
  },
  {
    id: 'brasa',
    name: { es: 'A la brasa', en: 'From the grill' },
    description: {
      es: 'Carnes a fuego vivo, con salsas de raíz japonesa.',
      en: 'Charcoal-grilled meats, with sauces rooted in Japanese cuisine.',
    },
  },
  {
    id: 'postres',
    name: { es: 'Postres', en: 'Desserts' },
    description: {
      es: 'Un cierre dulce, sin perder la sencillez de la carta.',
      en: 'A sweet close that keeps the menu’s simplicity.',
    },
  },
]

export const menuDishes: MenuDish[] = [
  // Para compartir
  {
    id: 'tempura-vegetales',
    categoryId: 'para-compartir',
    name: { es: 'Tempura de Vegetales', en: 'Vegetable Tempura' },
    // TODO: confirmar con el cliente — descripción de ejemplo (no figuraba en la carta).
    description: {
      es: 'Verduras de temporada en tempura ligera y crujiente.',
      en: 'Seasonal vegetables in a light, crisp tempura batter.',
    },
    price: 13,
    allergens: ['gluten'],
    image: { thumb: tempuraVeg480, full: tempuraVeg768 },
  },
  {
    id: 'tempura-langostinos',
    categoryId: 'para-compartir',
    name: { es: 'Tempura de Langostinos', en: 'Prawn Tempura' },
    // TODO: confirmar con el cliente — descripción de ejemplo (no figuraba en la carta).
    description: {
      es: 'Langostinos en tempura ligera y crujiente.',
      en: 'King prawns in a light, crisp tempura batter.',
    },
    price: 14,
    allergens: ['gluten', 'crustaceans'],
    image: { thumb: tempuraLangostinos480, full: tempuraLangostinos768 },
  },
  {
    id: 'nasu-miso',
    categoryId: 'para-compartir',
    name: { es: 'Nasu Miso', en: 'Nasu Miso' },
    description: {
      es: 'Berenjena gratinada en miso.',
      en: 'Aubergine glazed and gratinated in miso.',
    },
    price: 14,
    allergens: ['soy'],
    image: { thumb: nasuMiso480, full: nasuMiso768 },
  },
  {
    id: 'esparragos',
    categoryId: 'para-compartir',
    name: { es: 'Espárragos', en: 'Asparagus' },
    description: {
      es: 'Con vinagreta de soja y jengibre.',
      en: 'With a soy and ginger vinaigrette.',
    },
    price: 13,
    allergens: ['gluten', 'soy'],
    image: { thumb: esparragos480, full: esparragos768 },
  },
  {
    id: 'champinones',
    categoryId: 'para-compartir',
    name: { es: 'Champiñones', en: 'Mushrooms' },
    description: {
      es: 'Asados con mantequilla y soja.',
      en: 'Roasted with butter and soy.',
    },
    price: 13,
    allergens: ['gluten', 'milk', 'soy'],
    image: { thumb: champinones480, full: champinones768 },
  },

  // Crudos
  {
    id: 'sashimi',
    categoryId: 'crudos',
    name: { es: 'Sashimi', en: 'Sashimi' },
    description: {
      es: 'De salmón, con ponzu y trufa.',
      en: 'Salmon, with ponzu and truffle.',
    },
    price: 16,
    allergens: ['gluten', 'fish'],
    image: { thumb: sashimi480, full: sashimi768 },
    recommended: true,
  },
  {
    id: 'ceviche',
    categoryId: 'crudos',
    name: { es: 'Ceviche', en: 'Ceviche' },
    description: {
      es: 'De langostinos. Leche de coco, lima, maíz, pipas, cilantro, tomate cherry y cebolla.',
      en: 'King prawns, coconut milk, lime, corn, sunflower seeds, coriander, cherry tomato and onion.',
    },
    price: 17,
    allergens: ['crustaceans'],
    image: { thumb: ceviche480, full: ceviche768 },
  },
  {
    id: 'maki-sushi',
    categoryId: 'crudos',
    name: { es: 'Maki Sushi · 5 piezas', en: 'Maki Sushi · 5 pieces' },
    description: {
      es: 'De salmón, espárrago y chilli mayo.',
      en: 'Salmon, asparagus and chilli mayo.',
    },
    price: 9,
    allergens: ['eggs', 'fish'],
    image: { thumb: maki480, full: maki768 },
  },
  {
    id: 'carpaccio',
    categoryId: 'crudos',
    name: { es: 'Carpaccio', en: 'Carpaccio' },
    // TODO: confirmar con el cliente — plato sin datos en la foto de carta aportada
    // (nombre, descripción, precio y alérgenos de ejemplo).
    description: {
      es: 'De ternera, con parmesano, rúcula y aceite de oliva virgen extra.',
      en: 'Beef, with parmesan, rocket and extra virgin olive oil.',
    },
    price: 15,
    allergens: ['milk'],
    image: { thumb: carpaccio480, full: carpaccio768 },
    isExample: true,
  },

  // A la brasa
  {
    id: 'tataki',
    categoryId: 'brasa',
    name: { es: 'Tataki', en: 'Tataki' },
    description: {
      es: 'De lomo bajo de res, salsa wafu, chalota salteada y mirin.',
      en: 'Beef sirloin, wafu sauce, sautéed shallot and mirin.',
    },
    price: 26,
    allergens: ['gluten'],
    image: { thumb: tataki480, full: tataki768 },
    recommended: true,
  },
  {
    id: 'porkbelly',
    categoryId: 'brasa',
    name: { es: 'Porkbelly', en: 'Pork Belly' },
    description: {
      es: 'Panceta de cerdo con miso de chipotle.',
      en: 'Pork belly with chipotle miso.',
    },
    price: 21,
    allergens: ['soy'],
    image: { thumb: porkbelly480, full: porkbelly768 },
  },

  // Postres
  {
    id: 'panacotta',
    categoryId: 'postres',
    name: { es: 'Panacotta', en: 'Panna Cotta' },
    // TODO: confirmar con el cliente — descripción de ejemplo (no figuraba en la carta).
    description: {
      es: 'Panna cotta de vainilla con coulis de frutos rojos.',
      en: 'Vanilla panna cotta with a red berry coulis.',
    },
    price: 8,
    allergens: ['milk'],
    image: { thumb: panacotta480, full: panacotta768 },
  },
  {
    id: 'crumble-manzana',
    categoryId: 'postres',
    name: { es: 'Crumble de Manzana', en: 'Apple Crumble' },
    // TODO: confirmar con el cliente — descripción de ejemplo (no figuraba en la carta).
    description: {
      es: 'Manzana especiada con crumble crujiente y helado de vainilla.',
      en: 'Spiced apple with a crunchy crumble topping and vanilla ice cream.',
    },
    price: 8,
    allergens: ['milk', 'gluten'],
    image: { thumb: crumble480, full: crumble768 },
  },
]
