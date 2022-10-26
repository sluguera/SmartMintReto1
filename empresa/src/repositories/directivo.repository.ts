import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BdEmpresaDataSource} from '../datasources';
import {Directivo, DirectivoRelations} from '../models';

export class DirectivoRepository extends DefaultCrudRepository<
  Directivo,
  typeof Directivo.prototype.id,
  DirectivoRelations
> {
  constructor(
    @inject('datasources.BDEmpresa') dataSource: BdEmpresaDataSource,
  ) {
    super(Directivo, dataSource);
  }
}
