import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'BDEmpresa',
  connector: 'mongodb',
  url: 'mongodb+srv://sluguer:Scheveningen@218@cluster0.0ssogtv.mongodb.net/test',
  host: '0.0.0.0',
  port: 0,
  user: '00',
  password: '00',
  database: '0',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BdEmpresaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'BDEmpresa';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.BDEmpresa', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
