// src/student/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: StudentRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(newStudent);
  }

  async findAll(page: number, limit: number): Promise<{ students: Student[], total: number }> {
    const [students, total] = await this.studentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { students, total };
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
