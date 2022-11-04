import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Ordenservicio, OrdenservicioRelations, Cliente, Empleado, Equipo, Empresa} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {EquipoRepository} from './equipo.repository';
import {EmpresaRepository} from './empresa.repository';

export class OrdenservicioRepository extends DefaultCrudRepository<
  Ordenservicio,
  typeof Ordenservicio.prototype.id,
  OrdenservicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Ordenservicio.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Ordenservicio.prototype.id>;

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Ordenservicio.prototype.id>;

  public readonly empresas: HasManyRepositoryFactory<Empresa, typeof Ordenservicio.prototype.id>;

  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Ordenservicio, dataSource);
    this.empresas = this.createHasManyRepositoryFactoryFor('empresas', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresas', this.empresas.inclusionResolver);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
