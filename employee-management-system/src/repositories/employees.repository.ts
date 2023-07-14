import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmployeeManagementSystemDataSource} from '../datasources';
import {Employees, EmployeesRelations} from '../models';

export class EmployeesRepository extends DefaultCrudRepository<
  Employees,
  typeof Employees.prototype.id,
  EmployeesRelations
> {
  constructor(
    @inject('datasources.EmployeeManagementSystem') dataSource: EmployeeManagementSystemDataSource,
  ) {
    super(Employees, dataSource);
  }
}
