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
import {Titles} from '../models';
import {TitlesRepository} from '../repositories';

export class TitlesController {
  constructor(
    @repository(TitlesRepository)
    public titlesRepository : TitlesRepository,
  ) {}

  @post('/titles')
  @response(200, {
    description: 'Titles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Titles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Titles, {
            title: 'NewTitles',
            
          }),
        },
      },
    })
    titles: Titles,
  ): Promise<Titles> {
    return this.titlesRepository.create(titles);
  }

  @get('/titles')
  @response(200, {
    description: 'Array of Titles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Titles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Titles) filter?: Filter<Titles>,
  ): Promise<Titles[]> {
    return this.titlesRepository.find(filter);
  }

  @get('/titles/{id}')
  @response(200, {
    description: 'Titles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Titles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Titles, {exclude: 'where'}) filter?: FilterExcludingWhere<Titles>
  ): Promise<Titles> {
    return this.titlesRepository.findById(id, filter);
  }

  @patch('/titles/{id}')
  @response(204, {
    description: 'Titles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Titles, {partial: true}),
        },
      },
    })
    titles: Titles,
  ): Promise<void> {
    await this.titlesRepository.updateById(id, titles);
  }

  @put('/titles/{id}')
  @response(204, {
    description: 'Titles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titles: Titles,
  ): Promise<void> {
    await this.titlesRepository.replaceById(id, titles);
  }

  @del('/titles/{id}')
  @response(204, {
    description: 'Titles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titlesRepository.deleteById(id);
  }
}
