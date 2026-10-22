// Script de optimización de imágenes: convierte las fotos originales (assets-originales/)
// en WebP en varios tamaños dentro de src/assets/images/. Se ejecuta una sola vez (o cuando
// cambien las fotos originales) con: npm run optimize-images
// No forma parte del build de producción ni se despliega.
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.resolve(__dirname, '../../assets-originales')
const OUT_DIR = path.resolve(__dirname, '../src/assets/images')

const DISH_WIDTHS = [480, 768]
const LOCAL_WIDTHS = [640, 960]
const QUALITY = 78

/** @type {Record<string, string>} */
const dishes = {
  TempuraVegetales: 'tempura-vegetales',
  TempuraLangostinos: 'tempura-langostinos',
  BerenjenasAsadas: 'nasu-miso',
  EsparragosTrigueros: 'esparragos-soja-jengibre',
  ChampiñonesAsados: 'champinones-mantequilla-soja',
  SashimiSalmon: 'sashimi-salmon',
  Ceviche: 'ceviche-langostinos',
  MakiSushi: 'maki-sushi',
  BeefTataki: 'tataki-res',
  Porkbelly: 'porkbelly',
  Pannacotta: 'panacotta',
  CrumbleManzana: 'crumble-manzana',
  Carpaccio: 'carpaccio',
}

/** @type {Record<string, string>} */
const local = {
  Local1: 'local-detalle-ukiyo-e',
  Local2: 'local-jardin-buda',
  Local3: 'local-lampara-cristal',
  Local4: 'local-terraza',
  Local5: 'local-farolillo',
  Local6: 'local-comedor',
}

async function convert(sourceName, outName, widths, subdir) {
  const srcPath = path.join(SOURCE_DIR, `${sourceName}.png`)
  const outDir = path.join(OUT_DIR, subdir)
  await mkdir(outDir, { recursive: true })
  const image = sharp(srcPath)
  const meta = await image.metadata()

  for (const width of widths) {
    const targetWidth = meta.width && width > meta.width ? meta.width : width
    const outPath = path.join(outDir, `${outName}-${width}.webp`)
    await sharp(srcPath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)
    console.log(`  -> ${subdir}/${outName}-${width}.webp (${targetWidth}px)`)
  }
}

async function run() {
  console.log('Optimizando fotos de platos...')
  for (const [source, outName] of Object.entries(dishes)) {
    await convert(source, outName, DISH_WIDTHS, 'dishes')
  }

  console.log('Optimizando fotos del local...')
  for (const [source, outName] of Object.entries(local)) {
    await convert(source, outName, LOCAL_WIDTHS, 'local')
  }

  console.log('Listo.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
