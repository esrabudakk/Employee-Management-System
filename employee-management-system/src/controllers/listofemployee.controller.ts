import {
    Filter,
    repository,
} from '@loopback/repository';
import {
    get,
    getModelSchemaRef,
    param,
    response,
} from '@loopback/rest';
import { EmployeesRepository } from '../repositories';
import { Employees } from '../models';


export class ListofEmployee {
    constructor(@repository(EmployeesRepository)
    public employeeRepository: EmployeesRepository) { }

    @get('/list-of-employee/{id}')
    @response(200, {
        description: 'List of manager\'s employee',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Employees, {
                    includeRelations: true
                })
            }
        }

    })
    async find(
        @param.path.number('id') id: number,
        @param.filter(Employees) filter?: Filter<Employees>,
    ): Promise<Partial<Employees>> {
        const employees = await this.employeeRepository.find({
            where: { managerId: id }
        })
        return employees.map(({ managerId, ...rest }) => rest);
    }
}