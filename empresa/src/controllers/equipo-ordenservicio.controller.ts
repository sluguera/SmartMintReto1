import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Equipo,
  Ordenservicio,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoOrdenservicioController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/ordenservicio', {
    responses: {
      '200': {
        description: 'Ordenservicio belonging to Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenservicio)},
          },
        },
      },
    },
  })
  async getOrdenservicio(
    @param.path.string('id') id: typeof Equipo.prototype.id,
  ): Promise<Ordenservicio> {
    return this.equipoRepository.ordenservicio(id);
  }
}
