import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Persona, PersonaRelations} from '../models';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {
  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource,
  ) {
    super(Persona, dataSource);
  }
}
