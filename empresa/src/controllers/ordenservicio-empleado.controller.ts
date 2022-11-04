import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ordenservicio,
  Empleado,
} from '../models';
import {OrdenservicioRepository} from '../repositories';

export class OrdenservicioEmpleadoController {
  constructor(
    @repository(OrdenservicioRepository) protected ordenservicioRepository: OrdenservicioRepository,
  ) { }

  @get('/ordenservicios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Ordenservicio has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.ordenservicioRepository.empleados(id).find(filter);
  }

  @post('/ordenservicios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ordenservicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ordenservicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInOrdenservicio',
            exclude: ['id'],
            optional: ['ordenservicioId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.ordenservicioRepository.empleados(id).create(empleado);
  }

  @patch('/ordenservicios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ordenservicio.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.ordenservicioRepository.empleados(id).patch(empleado, where);
  }

  @del('/ordenservicios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ordenservicio.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.ordenservicioRepository.empleados(id).delete(where);
  }
}
