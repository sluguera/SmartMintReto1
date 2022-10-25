import {Entity, model, property} from '@loopback/repository';

@model()
export class Directivo extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  categotia: number;


  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
