import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Equipo} from './equipo.model';
import {Empresa} from './empresa.model';

@model()
export class Ordenservicio extends Entity {
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
  numero: string;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  monto?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Equipo)
  equipos: Equipo[];

  @hasMany(() => Empresa)
  empresas: Empresa[];

  constructor(data?: Partial<Ordenservicio>) {
    super(data);
  }
}

export interface OrdenservicioRelations {
  // describe navigational properties here
}

export type OrdenservicioWithRelations = Ordenservicio & OrdenservicioRelations;
