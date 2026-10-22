import type { Bilingual } from '@/types/common'

// TODO: confirmar con el cliente — textos de ejemplo (tono y estructura orientativos).
// Sustituir por la historia, filosofía y cocina reales del restaurante antes de publicar.
export const aboutContent = {
  intro: {
    es: 'Izakaya nació de un viaje por Japón y de las ganas de traer a casa esa manera de comer: despacio, compartiendo, sin prisa por terminar.',
    en: 'Izakaya was born from a trip through Japan and the wish to bring that way of eating home: slow, shared, unhurried.',
  } satisfies Bilingual,

  history: {
    paragraphs: [
      {
        es: 'Todo empezó en una barra de Osaka, entre el humo de la brasa y el ruido de los platillos pasando de mano en mano. De ahí nació la idea de abrir un espacio propio: pequeño, honesto, construido alrededor de una cocina abierta y una barra desde la que mirar a quien cocina.',
        en: 'It all started at a bar in Osaka, between the smoke of the grill and the sound of small plates passing from hand to hand. That is where the idea of opening our own space came from: small, honest, built around an open kitchen and a bar where you can watch the cooking happen.',
      },
      {
        es: 'Desde el primer día quisimos que Izakaya fuera un lugar de paso lento: se entra a tomar una copa y un par de platos, y sin darte cuenta han pasado tres horas y la mesa sigue llena de pequeños platos vacíos.',
        en: 'From day one we wanted Izakaya to be a place for slow evenings: you come in for a drink and a couple of dishes, and before you notice, three hours have gone by and the table is still covered in small empty plates.',
      },
    ] satisfies Bilingual[],
  },

  philosophy: {
    paragraphs: [
      {
        es: 'Creemos en el producto antes que en la técnica, y en la técnica antes que en el adorno. Cada plato se piensa primero por lo que lleva dentro: pescado de lonja, verdura de temporada, carnes de proveedores de confianza.',
        en: 'We believe in produce before technique, and in technique before decoration. Every dish starts from what goes into it: fish from the market, seasonal vegetables, meat from suppliers we trust.',
      },
      {
        es: 'La brasa y el fuego directo son nuestra herramienta principal; el resto es dejar que el ingrediente hable. La misma idea guía el espacio: líneas limpias, materiales nobles y ningún elemento que no tenga una razón de ser.',
        en: 'Live fire and direct heat are our main tool; the rest is about letting the ingredient speak. The same idea guides the space itself: clean lines, honest materials, and nothing that is not there for a reason.',
      },
    ] satisfies Bilingual[],
  },

  cuisine: {
    paragraphs: [
      {
        es: 'La carta cambia con el mercado y se sirve en formato de tapas, para que una mesa pueda probar de todo sin pedir una ración entera de cada cosa: tempuras ligeras, crudos trabajados con cítricos y encurtidos, y algo de brasa para quien busca algo más contundente.',
        en: 'The menu changes with the market and is served tapas-style, so a table can try a bit of everything without ordering a full portion of each dish: light tempura, raw dishes worked with citrus and pickles, and something off the grill for those after something heartier.',
      },
      {
        es: 'Siempre con un ojo puesto en la tradición japonesa y otro en lo que hay ese día en el mercado.',
        en: 'Always with one eye on Japanese tradition and the other on whatever the market has that day.',
      },
    ] satisfies Bilingual[],
  },
}
