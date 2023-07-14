import {
    FilterExcludingWhere,
    repository,
} from '@loopback/repository';
import {
    get,
    getModelSchemaRef,
    param,
    response,
} from '@loopback/rest';
import { DepartmentsRepository, EmployeesRepository, TitleHistoriesRepository, TitlesRepository } from "../repositories";
import { Departments, Employees, TitleHistories, Titles } from "../models";

export class TitleHistoriesWEmployee {
    constructor(
        @repository(EmployeesRepository)
        public employeesRepository: EmployeesRepository,
        @repository(TitleHistoriesRepository)
        public titleHistoriesRepository: TitleHistoriesRepository,
        @repository(TitlesRepository)
        public titlesRepository: TitlesRepository,
        @repository(DepartmentsRepository)
        public departmentsRepository: DepartmentsRepository,
    ) { }


    @get('/title-histories-of-employee/{id}')
    @response(200, {
        description: 'Titles Histories of Employee',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Employees, {
                    includeRelations: true
                })
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Employees, { exclude: 'where' }) filter?: FilterExcludingWhere<Employees>
    ): Promise<Partial<Employees & Titles & Departments & TitleHistories> | string> {
        const employee = await this.employeesRepository.findById(id);

        if (employee) {
            const { departmentName } = await this.departmentsRepository.findById(employee.departmentId);

            const { firstName, lastName, email } = employee;

            const titleHistoriesObject = await this.titleHistoriesRepository.find({
                where: { employeeId: id },
            });

            const titleDates = titleHistoriesObject.map((th) => ({
                titleId: th.titleId,
                startDate: th.startDate,
                endDate: th.endDate,
            }));

            const titleIds = titleDates.map((td) => td.titleId);

            const titles = await this.titlesRepository.find({
                where: { id: { inq: titleIds } },
            });

            const titleHistoriesWithTitles = titleHistoriesObject.map((th) => {
                const title = titles.find((t) => t.id === th.titleId);
                return {
                    titleName: title?.titleName ?? null,
                    salary: title?.salary ?? null,
                    startDate: th.startDate,
                    endDate: th.endDate,
                };
            });

            return {
                firstName,
                lastName,
                email,
                departmentName,
                titleHistories: titleHistoriesWithTitles,
            };
        }
        return "404";
    }

}


