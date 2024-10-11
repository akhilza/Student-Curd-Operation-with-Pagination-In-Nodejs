// src/student/student.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("/create")
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const result = await this.studentService.findAll(pageNum, limitNum);
    return {
      students: result.students,
      totalPages: Math.ceil(result.total / limitNum),
      currentPage: pageNum,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentService.remove(+id);
  }
}
