import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { MarkRepository } from './mark.repository';
import { MarkService } from './mark.service';
import { MarksController } from './mark.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mark])], 
  providers: [MarkService, MarkRepository], 
  controllers: [MarksController],
})
export class MarkModule {}
