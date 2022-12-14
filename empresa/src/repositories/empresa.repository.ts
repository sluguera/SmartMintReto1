import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Ordenservicio} from '../models';
import {OrdenservicioRepository} from './ordenservicio.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly ordenservicio: BelongsToAccessor<Ordenservicio, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource, @repository.getter('OrdenservicioRepository') protected ordenservicioRepositoryGetter: Getter<OrdenservicioRepository>,
  ) {
    super(Empresa, dataSource);
    this.ordenservicio = this.createBelongsToAccessorFor('ordenservicio', ordenservicioRepositoryGetter,);
    this.registerInclusionResolver('ordenservicio', this.ordenservicio.inclusionResolver);
  }
}
