import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ordenservicio} from './ordenservicio.model';

@model()
export class Equipo extends Entity {
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
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
  })
  serie?: string;

  @property({
    type: 'string',
  })
  modelo?: string;

  @belongsTo(() => Ordenservicio)
  ordenservicioId: string;

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
