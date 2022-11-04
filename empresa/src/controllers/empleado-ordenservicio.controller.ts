import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Ordenservicio,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoOrdenservicioController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/ordenservicio', {
    responses: {
      '200': {
        description: 'Ordenservicio belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenservicio)},
          },
        },
      },
    },
  })
  async getOrdenservicio(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Ordenservicio> {
    return this.empleadoRepository.ordenservicio(id);
  }
}
