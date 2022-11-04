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
  Empresa,
} from '../models';
import {OrdenservicioRepository} from '../repositories';

export class OrdenservicioEmpresaController {
  constructor(
    @repository(OrdenservicioRepository) protected ordenservicioRepository: OrdenservicioRepository,
  ) { }

  @get('/ordenservicios/{id}/empresas', {
    responses: {
      '200': {
        description: 'Array of Ordenservicio has many Empresa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    return this.ordenservicioRepository.empresas(id).find(filter);
  }

  @post('/ordenservicios/{id}/empresas', {
    responses: {
      '200': {
        description: 'Ordenservicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ordenservicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresaInOrdenservicio',
            exclude: ['id'],
            optional: ['ordenservicioId']
          }),
        },
      },
    }) empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.ordenservicioRepository.empresas(id).create(empresa);
  }

  @patch('/ordenservicios/{id}/empresas', {
    responses: {
      '200': {
        description: 'Ordenservicio.Empresa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Partial<Empresa>,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.ordenservicioRepository.empresas(id).patch(empresa, where);
  }

  @del('/ordenservicios/{id}/empresas', {
    responses: {
      '200': {
        description: 'Ordenservicio.Empresa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.ordenservicioRepository.empresas(id).delete(where);
  }
}
