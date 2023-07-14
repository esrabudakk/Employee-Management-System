import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {TitleHistories} from '../models';
import { TitleHistoriesRepository} from '../repositories';

export class TitleHistoriesController {
  constructor(
    @repository(TitleHistoriesRepository)
    public titleHistoriesRepository : TitleHistoriesRepository,
  ) {}

  @post('/title-histories')
  @response(200, {
    description: 'TitleHistories model instance',
    content: {'application/json': {schema: getModelSchemaRef(TitleHistories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistories, {
            title: 'NewTitleHistories',
            
          }),
        },
      },
    })
    titleHistories: TitleHistories,
  ): Promise<TitleHistories > {


    return this.titleHistoriesRepository.create(titleHistories);
  }


  @get('/title-histories')
  @response(200, {
    description: 'Array of TitleHistories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TitleHistories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TitleHistories) filter?: Filter<TitleHistories>,
  ): Promise<TitleHistories[]> {

    return this.titleHistoriesRepository.find(filter);
  }

  @patch('/title-histories')
  @response(200, {
    description: 'TitleHistories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistories, {partial: true}),
        },
      },
    })
    titleHistories: TitleHistories,
    @param.where(TitleHistories) where?: Where<TitleHistories>,
  ): Promise<Count> {
    return this.titleHistoriesRepository.updateAll(titleHistories, where);
  }


  @get('/title-histories/{id}')
  @response(200, {
    description: 'TitleHistories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TitleHistories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TitleHistories, { exclude: 'where' }) filter?: FilterExcludingWhere<TitleHistories>
  ): Promise<Partial<TitleHistories> | TitleHistories> {
    const [titleHistories] = await Promise.all([
      this.titleHistoriesRepository.findById(id),
    ]);

    const { startDate, endDate } = titleHistories;
    return {
      id,
      startDate,
      endDate,
    };
  }
  

  @patch('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistories, {partial: true}),
        },
      },
    })
    titleHistories: TitleHistories,
  ): Promise<void> {
    await this.titleHistoriesRepository.updateById(id, titleHistories);
  }

  @put('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titleHistories: TitleHistories,
  ): Promise<void> {
    await this.titleHistoriesRepository.replaceById(id, titleHistories);
  }

  @del('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleHistoriesRepository.deleteById(id);
  }
}
