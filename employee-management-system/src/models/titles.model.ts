import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Titles extends Entity {
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
      columnName:'title_name',
    }
  })
  titleName: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName:'salary',
    }
  })
  salary: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName:'responsibilities',
    }
  })
  responsibilities: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Titles>) {
    super(data);
  }
}

export interface TitlesRelations {
  // describe navigational properties here
}

export type TitlesWithRelations = Titles & TitlesRelations;
