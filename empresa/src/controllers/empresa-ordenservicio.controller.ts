import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empresa,
  Ordenservicio,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaOrdenservicioController {
  constructor(
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/ordenservicio', {
    responses: {
      '200': {
        description: 'Ordenservicio belonging to Empresa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenservicio)},
          },
        },
      },
    },
  })
  async getOrdenservicio(
    @param.path.string('id') id: typeof Empresa.prototype.id,
  ): Promise<Ordenservicio> {
    return this.empresaRepository.ordenservicio(id);
  }
}
