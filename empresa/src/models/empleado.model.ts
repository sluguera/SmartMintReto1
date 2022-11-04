import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ordenservicio} from './ordenservicio.model';

@model()
export class Empleado extends Entity {
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
    type: 'date',
  })
  fechanacimiento?: string;

  @property({
    type: 'string',
  })
  sueldobruto?: string;

  @property({
    type: 'string',
  })
  categoria?: string;

  @belongsTo(() => Ordenservicio)
  ordenservicioId: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
