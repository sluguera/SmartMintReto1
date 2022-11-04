import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Ordenservicio} from '../models';
import {OrdenservicioRepository} from '../repositories';

export class OrdenservicioController {
  constructor(
    @repository(OrdenservicioRepository)
    public ordenservicioRepository : OrdenservicioRepository,
  ) {}

  @post('/ordenservicios')
  @response(200, {
    description: 'Ordenservicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ordenservicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenservicio, {
            title: 'NewOrdenservicio',
            exclude: ['id'],
          }),
        },
      },
    })
    ordenservicio: Omit<Ordenservicio, 'id'>,
  ): Promise<Ordenservicio> {
    return this.ordenservicioRepository.create(ordenservicio);
  }

  @get('/ordenservicios/count')
  @response(200, {
    description: 'Ordenservicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ordenservicio) where?: Where<Ordenservicio>,
  ): Promise<Count> {
    return this.ordenservicioRepository.count(where);
  }

  @get('/ordenservicios')
  @response(200, {
    description: 'Array of Ordenservicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ordenservicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ordenservicio) filter?: Filter<Ordenservicio>,
  ): Promise<Ordenservicio[]> {
    return this.ordenservicioRepository.find(filter);
  }

  @patch('/ordenservicios')
  @response(200, {
    description: 'Ordenservicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenservicio, {partial: true}),
        },
      },
    })
    ordenservicio: Ordenservicio,
    @param.where(Ordenservicio) where?: Where<Ordenservicio>,
  ): Promise<Count> {
    return this.ordenservicioRepository.updateAll(ordenservicio, where);
  }

  @get('/ordenservicios/{id}')
  @response(200, {
    description: 'Ordenservicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ordenservicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ordenservicio, {exclude: 'where'}) filter?: FilterExcludingWhere<Ordenservicio>
  ): Promise<Ordenservicio> {
    return this.ordenservicioRepository.findById(id, filter);
  }

  @patch('/ordenservicios/{id}')
  @response(204, {
    description: 'Ordenservicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenservicio, {partial: true}),
        },
      },
    })
    ordenservicio: Ordenservicio,
  ): Promise<void> {
    await this.ordenservicioRepository.updateById(id, ordenservicio);
  }

  @put('/ordenservicios/{id}')
  @response(204, {
    description: 'Ordenservicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ordenservicio: Ordenservicio,
  ): Promise<void> {
    await this.ordenservicioRepository.replaceById(id, ordenservicio);
  }

  @del('/ordenservicios/{id}')
  @response(204, {
    description: 'Ordenservicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenservicioRepository.deleteById(id);
  }
}
