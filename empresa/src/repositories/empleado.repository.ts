import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Ordenservicio} from '../models';
import {OrdenservicioRepository} from './ordenservicio.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly ordenservicio: BelongsToAccessor<Ordenservicio, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource, @repository.getter('OrdenservicioRepository') protected ordenservicioRepositoryGetter: Getter<OrdenservicioRepository>,
  ) {
    super(Empleado, dataSource);
    this.ordenservicio = this.createBelongsToAccessorFor('ordenservicio', ordenservicioRepositoryGetter,);
    this.registerInclusionResolver('ordenservicio', this.ordenservicio.inclusionResolver);
  }
}
