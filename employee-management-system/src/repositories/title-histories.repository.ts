import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmployeeManagementSystemDataSource} from '../datasources';
import {TitleHistories, TitleHistoriesRelations} from '../models';

export class TitleHistoriesRepository extends DefaultCrudRepository<
  TitleHistories,
  typeof TitleHistories.prototype.id,
  TitleHistoriesRelations
> {
  constructor(
    @inject('datasources.EmployeeManagementSystem') dataSource: EmployeeManagementSystemDataSource,
  ) {
    super(TitleHistories, dataSource);
  }
}
