// src/marks/marks.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarkService) {}

  @Post()
  async create(@Body() createMarkDto: CreateMarkDto) {
    return await this.marksService.create(createMarkDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.marksService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return await this.marksService.update(+id, updateMarkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.marksService.remove(+id);
  }
}