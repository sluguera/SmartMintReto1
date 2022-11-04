import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ordenservicio,
  Cliente,
} from '../models';
import {OrdenservicioRepository} from '../repositories';

export class OrdenservicioClienteController {
  constructor(
    @repository(OrdenservicioRepository)
    public ordenservicioRepository: OrdenservicioRepository,
  ) { }

  @get('/ordenservicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Ordenservicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Ordenservicio.prototype.id,
  ): Promise<Cliente> {
    return this.ordenservicioRepository.cliente(id);
  }
}
