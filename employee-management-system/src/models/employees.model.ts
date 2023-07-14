import { Entity, belongsTo, model, property } from '@loopback/repository';
import { Departments } from './departments.model';
import { Titles } from './titles.model';

@model({
  settings: {
    strict: true,
    foreignKeys: {
      fkManagerId: {
        name: 'fk_manager_id',
        entity: 'Employees',
        entityKey: 'id',
        foreignKey: 'managerid',
      },
      fkTitleId: {
        name: 'fk_title_id',
        entity: 'Titles',
        entityKey: 'id',
        foreignKey: 'titleid',
      },
      fkDepartmentId: {
        name: 'fk_department_id',
        entity: 'Departments',
        entityKey: 'id',
        foreignKey: 'departmentid',
      }
    }
  },
})
export class Employees extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'first_name',
    }
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'last_name',
    }
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'phone',
    }
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'hire_date',
    }
  })
  hireDate: string;

  @belongsTo(() => Departments)
  departmentId: number;

  @belongsTo(() => Titles)
  titleId: number;

  @belongsTo(() => Employees)
  managerId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employees>) {
    super(data);
  }
}

export interface EmployeesRelations {
  // describe navigational properties here
}

export type EmployeesWithRelations = Employees & EmployeesRelations;
