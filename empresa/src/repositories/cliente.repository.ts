import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Cliente, ClienteRelations, Ordenservicio} from '../models';
import {OrdenservicioRepository} from './ordenservicio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly ordenservicios: HasManyRepositoryFactory<Ordenservicio, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource, @repository.getter('OrdenservicioRepository') protected ordenservicioRepositoryGetter: Getter<OrdenservicioRepository>,
  ) {
    super(Cliente, dataSource);
    this.ordenservicios = this.createHasManyRepositoryFactoryFor('ordenservicios', ordenservicioRepositoryGetter,);
    this.registerInclusionResolver('ordenservicios', this.ordenservicios.inclusionResolver);
  }
}
