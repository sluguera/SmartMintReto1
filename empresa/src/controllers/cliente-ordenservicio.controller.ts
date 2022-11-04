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
  Cliente,
  Ordenservicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteOrdenservicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/ordenservicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Ordenservicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenservicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ordenservicio>,
  ): Promise<Ordenservicio[]> {
    return this.clienteRepository.ordenservicios(id).find(filter);
  }

  @post('/clientes/{id}/ordenservicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ordenservicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenservicio, {
            title: 'NewOrdenservicioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) ordenservicio: Omit<Ordenservicio, 'id'>,
  ): Promise<Ordenservicio> {
    return this.clienteRepository.ordenservicios(id).create(ordenservicio);
  }

  @patch('/clientes/{id}/ordenservicios', {
    responses: {
      '200': {
        description: 'Cliente.Ordenservicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenservicio, {partial: true}),
        },
      },
    })
    ordenservicio: Partial<Ordenservicio>,
    @param.query.object('where', getWhereSchemaFor(Ordenservicio)) where?: Where<Ordenservicio>,
  ): Promise<Count> {
    return this.clienteRepository.ordenservicios(id).patch(ordenservicio, where);
  }

  @del('/clientes/{id}/ordenservicios', {
    responses: {
      '200': {
        description: 'Cliente.Ordenservicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ordenservicio)) where?: Where<Ordenservicio>,
  ): Promise<Count> {
    return this.clienteRepository.ordenservicios(id).delete(where);
  }
}
