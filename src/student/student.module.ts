import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])], 
  providers: [StudentService, StudentRepository], 
  controllers: [StudentController],
})
export class StudentModule {}
