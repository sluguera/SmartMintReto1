import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ordenservicio} from './ordenservicio.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  fechanacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Ordenservicio)
  ordenservicios: Ordenservicio[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
