import { DepartmentsRepository, EmployeesRepository, TitlesRepository } from "../repositories";
import { Departments  } from "../models";
import {
    FilterExcludingWhere,
    repository,
} from '@loopback/repository';
import {
    param,
    get,
    getModelSchemaRef,
    response,
} from '@loopback/rest';

export class SalaryController {
    constructor(
        @repository(DepartmentsRepository)
        public departmentsRepository: DepartmentsRepository,
        @repository(EmployeesRepository)
        public employeeRespository: EmployeesRepository,
        @repository(TitlesRepository)
        public titlesRepository: TitlesRepository,
    ) { }
    @get('/salary-of-departments/{id}')
    @response(200, {
        description: 'Array of Departments model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Departments, { includeRelations: true }),
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Departments, { exclude: 'where' }) filter?: FilterExcludingWhere<Departments>
    ): Promise<Partial<Departments> | number | string[]> {
        const department = await this.departmentsRepository.findById(id);
        const employee = await this.employeeRespository.find(
            { where: { departmentId: id } }
        )
        const departmentName = department.departmentName
        const titleIds = employee.map((ti) => ti.titleId);

        let totalSalary = 0
        let avarageSalary = 0

        const titles = await this.titlesRepository.find({
            where: { id: { inq: titleIds } }
        });
        const titlesAll: string[] = []
        for (const titleId of titleIds) {
            const title = titles.find((th) => th.id === titleId);
            if (title) {
                totalSalary += title.salary;
                titlesAll.push(title.titleName)
            }
        }
        avarageSalary = totalSalary / employee.length
        const titleSalaries: number[] = [];

        for (const title of titles) {
            const salary = title.salary;
            titleSalaries.push(salary);
        }
        return {
            departmentName,
            avarageSalary,
            titlesAll
        }
    }

}


