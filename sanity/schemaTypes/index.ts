import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import hero from './hero'
import navbar from './navbar'
import footer from './footer'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, hero, navbar, footer],
}
