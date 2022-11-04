import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Equipo, EquipoRelations, Ordenservicio} from '../models';
import {OrdenservicioRepository} from './ordenservicio.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly ordenservicio: BelongsToAccessor<Ordenservicio, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource, @repository.getter('OrdenservicioRepository') protected ordenservicioRepositoryGetter: Getter<OrdenservicioRepository>,
  ) {
    super(Equipo, dataSource);
    this.ordenservicio = this.createBelongsToAccessorFor('ordenservicio', ordenservicioRepositoryGetter,);
    this.registerInclusionResolver('ordenservicio', this.ordenservicio.inclusionResolver);
  }
}
