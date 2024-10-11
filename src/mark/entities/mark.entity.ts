// src/marks/entities/mark.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity('marks')
export class Mark {
  @PrimaryGeneratedColumn()
  mark_id: number;

  @ManyToOne(() => Student, (student) => student.marks, { onDelete: 'CASCADE' })
  student: Student;

  @Column({ length: 100 })
  subject: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score: number;

  @Column()
  semester: number;
}