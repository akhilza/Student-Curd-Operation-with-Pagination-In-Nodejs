import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { MarkModule } from './mark/mark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'testing',
      database: 'studentcurd', 
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    StudentModule,
    MarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
