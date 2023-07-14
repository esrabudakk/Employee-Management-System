import { Entity, belongsTo, model, property } from '@loopback/repository';
import { Locations } from './locations.model';
import { Employees } from './employees.model';

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
      fkLocationId: {
        name: 'fk_location_id',
        entity: 'Locations',
        entityKey: 'id',
        foreignKey: 'locationid',
      }
    }
  },
})
export class Departments extends Entity {
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
      columnName:'department_name',
    }
  })
  departmentName: string;

  
  @belongsTo(() => Locations)
  locationId: number;

  @belongsTo(() => Employees)
  managerId:number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Departments>) {
    super(data);
  }
}

export interface DepartmentsRelations {
  // describe navigational properties here
}

export type DepartmentsWithRelations = Departments & DepartmentsRelations;
