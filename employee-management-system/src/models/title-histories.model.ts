import { Entity, belongsTo, model, property } from '@loopback/repository';
import { Departments } from './departments.model';
import { Titles } from './titles.model';
import { Employees } from './employees.model';

@model({
  settings: {
    strict:true,
    foreignKeys: {
      fkDepartmentId: {
        name: 'fk_department_id',
        entity: 'Departments',
        entityKey: 'id',
        foreignKey: 'departmentid',
      },
      fkEmployeeId: {
        name: 'fk_employee_id',
        entity: 'Employees',
        entityKey: 'id',
        foreignKey: 'employeeid',
      },
      fkTitleId: {
        name: 'fk_title_id',
        entity: 'Titles',
        entityKey: 'id',
        foreignKey: 'titleid',
      },
    },
    
  },
})
export class TitleHistories extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'start_date',
    }
  })
  startDate: string;

  @property({
    type: 'date',
    default: '20300101',
    postgresql: {
      columnName: 'end_date',
    }
  })
  endDate?: string;

  @belongsTo(() => Departments)
  departmentId: number;

  @belongsTo(() => Titles)
  titleId: number;

  @belongsTo(() => Employees)
  employeeId: number;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TitleHistories>) {
    super(data);
  }
}

export interface TitleHistoriesRelations {
  // describe navigational properties here
}

export type TitleHistoriesWithRelations = TitleHistories & TitleHistoriesRelations;
