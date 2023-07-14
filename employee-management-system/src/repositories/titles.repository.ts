import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmployeeManagementSystemDataSource} from '../datasources';
import {Titles, TitlesRelations} from '../models';

export class TitlesRepository extends DefaultCrudRepository<
  Titles,
  typeof Titles.prototype.id,
  TitlesRelations
> {
  constructor(
    @inject('datasources.EmployeeManagementSystem') dataSource: EmployeeManagementSystemDataSource,
  ) {
    super(Titles, dataSource);
  }
}
