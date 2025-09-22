export const TipoValues = ['BEBESTIBLE', 'COMESTIBLE'] as const;
export type Tipo = (typeof TipoValues)[number];