import {
  Filter,
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
import {Departments} from '../models';
import {DepartmentsRepository} from '../repositories';

export class DepartmentsController {
  constructor(
    @repository(DepartmentsRepository)
    public departmentsRepository : DepartmentsRepository,
  ) {}

  @post('/departments')
  @response(200, {
    description: 'Departments model instance',
    content: {'application/json': {schema: getModelSchemaRef(Departments)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departments, {
            title: 'NewDepartments',
            
          }),
        },
      },
    })
    departments: Departments,
  ): Promise<Departments> {
    return this.departmentsRepository.create(departments);
  }

  @get('/departments')
  @response(200, {
    description: 'Array of Departments model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Departments, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Departments) filter?: Filter<Departments>,
  ): Promise<Departments[]> {
    return this.departmentsRepository.find(filter);
  }

  @patch('/departments/{id}')
  @response(204, {
    description: 'Departments PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departments, {partial: true}),
        },
      },
    })
    departments: Departments,
  ): Promise<void> {
    await this.departmentsRepository.updateById(id, departments);
  }

  @put('/departments/{id}')
  @response(204, {
    description: 'Departments PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departments: Departments,
  ): Promise<void> {
    await this.departmentsRepository.replaceById(id, departments);
  }

  @del('/departments/{id}')
  @response(204, {
    description: 'Departments DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departmentsRepository.deleteById(id);
  }
}
