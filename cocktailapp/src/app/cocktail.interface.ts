export interface Cocktail {
    id: string,
    name: string,
    thumbnail: string,
    glass: string,
    ingredients: any, // Forego strong typing due to bug in TS??? https://github.com/microsoft/TypeScript/issues/31663
    instructions: string
}