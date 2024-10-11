// src/student/entities/student.entity.ts
import { Mark } from 'src/mark/entities/mark.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: string;

  @Column({ length: 100, unique: true })
  email: string;

  // Relationship with marks
  @OneToMany(() => Mark, (mark) => mark.student, { cascade: true })
  marks: Mark[];
}