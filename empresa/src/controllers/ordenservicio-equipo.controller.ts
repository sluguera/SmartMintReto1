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
  Equipo,
} from '../models';
import {OrdenservicioRepository} from '../repositories';

export class OrdenservicioEquipoController {
  constructor(
    @repository(OrdenservicioRepository) protected ordenservicioRepository: OrdenservicioRepository,
  ) { }

  @get('/ordenservicios/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Ordenservicio has many Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.ordenservicioRepository.equipos(id).find(filter);
  }

  @post('/ordenservicios/{id}/equipos', {
    responses: {
      '200': {
        description: 'Ordenservicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ordenservicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInOrdenservicio',
            exclude: ['id'],
            optional: ['ordenservicioId']
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.ordenservicioRepository.equipos(id).create(equipo);
  }

  @patch('/ordenservicios/{id}/equipos', {
    responses: {
      '200': {
        description: 'Ordenservicio.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.ordenservicioRepository.equipos(id).patch(equipo, where);
  }

  @del('/ordenservicios/{id}/equipos', {
    responses: {
      '200': {
        description: 'Ordenservicio.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.ordenservicioRepository.equipos(id).delete(where);
  }
}
