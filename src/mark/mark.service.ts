// src/marks/marks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Injectable()
export class MarkService {
  constructor(
    @InjectRepository(Mark)
    private marksRepository: Repository<Mark>,
  ) {}

  async create(createMarkDto: CreateMarkDto): Promise<Mark> {
    const newMark = this.marksRepository.create(createMarkDto);
    return await this.marksRepository.save(newMark);
  }

  async findOne(id: number): Promise<Mark> {
    const mark = await this.marksRepository.findOne({
      where: { mark_id: id },
      relations: ['student'],
    });

    if (!mark) {
      throw new NotFoundException( `Mark with ID ${id} not found`);
    }
    return mark;
  }

  async update(id: number, updateMarkDto: UpdateMarkDto): Promise<Mark> {
    const mark = await this.marksRepository.preload({
      mark_id: id,
      ...updateMarkDto,
    });

    if (!mark) {
      throw new NotFoundException(`Mark with ID ${id} not found`);
    }

    return await this.marksRepository.save(mark);
  }

  async remove(id: number): Promise<void> {
    const result = await this.marksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mark with ID ${id} not found`);
    }
  }
}