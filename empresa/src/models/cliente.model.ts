import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;
  
  @property({
    type: 'string',
    required: true,
  })
  telefono: string;


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
