import { EntityRepository, Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';

@EntityRepository(Mark)
export class MarkRepository extends Repository<Mark> {}
