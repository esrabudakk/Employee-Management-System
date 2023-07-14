import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmployeeManagementSystemDataSource} from '../datasources';
import {Departments, DepartmentsRelations} from '../models';

export class DepartmentsRepository extends DefaultCrudRepository<
  Departments,
  typeof Departments.prototype.id,
  DepartmentsRelations
> {
  constructor(
    @inject('datasources.EmployeeManagementSystem') dataSource: EmployeeManagementSystemDataSource,
  ) {
    super(Departments, dataSource);
  }
}
