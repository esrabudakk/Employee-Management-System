import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Employees, Titles} from '../models';
import {EmployeesRepository, TitlesRepository} from '../repositories';

export class EmployeesController {
  constructor(
    @repository(EmployeesRepository)
    public employeesRepository : EmployeesRepository,
    @repository(TitlesRepository)
    public titlesRepository : TitlesRepository,
  ) {}

  @post('/employees')
  @response(200, {
    description: 'Employees model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employees)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {
            title: 'NewEmployees',
            
          }),
        },
      },
    })
    employees: Employees,
  ): Promise<Employees> {
    return this.employeesRepository.create(employees);
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employees model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employees, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employees) filter?: Filter<Employees>,
  ): Promise<Employees[]> {
    return this.employeesRepository.find(filter);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employees model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employees, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employees, {exclude: 'where'}) filter?: FilterExcludingWhere<Employees>
  ): Promise<Partial<Employees & Titles> | string | Employees> {
      const employeeObject =await this.employeesRepository.findById(id);
      if (employeeObject.titleId)
      {
        const {salary, titleName} = await this.titlesRepository.findById(employeeObject.titleId);
        return {
          ...employeeObject,
          salary,
          titleName
        }
      }
      return employeeObject
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employees PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {partial: true}),
        },
      },
    })
    employees: Employees,
  ): Promise<void> {
    await this.employeesRepository.updateById(id, employees);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employees PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employees: Employees,
  ): Promise<void> {
    await this.employeesRepository.replaceById(id, employees);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employees DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeesRepository.deleteById(id);
  }
}
