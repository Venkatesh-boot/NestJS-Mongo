import {
    Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as tasksModel from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query('status') status?: tasksModel.TaskStatus,
    @Query('search') search?: string,
  ): Promise<tasksModel.Task[]> {
    if (status) {
      return this.tasksService.getTasksByStatus(status);
    }
    if (search) {
      return this.tasksService.getTasksBySearchTerm(search);
    }
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<tasksModel.Task> {
    return this.tasksService.createTask(createTaskDto);
  }













    
//   @Get()
//   getAllTasks(
//     @Query('status') status?: TaskStatus,
//     @Query('search') search?: string,
//   ): Task[] {
//     if (status) {
//       return this.tasksService.getTasksByStatus(status);
//     }
//     if (search) {
//       return this.tasksService.getTasksBySearchTerm(search);
//     }
//     return this.tasksService.getAllTasks();
//   }

//   @Get('/:id')
//   getTaskById(@Param('id') id: string): Task {
//     const task = this.tasksService.getTaskById(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     return task;
//   }

//   @Delete('/:id')
//   deleteTaskById(@Param('id') id: string): void {
//     const task = this.tasksService.getTaskById(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     this.tasksService.deleteTaskById(id);
//   }

//   @Post()
//   createTask(@Body() createTaskDto: CreateTaskDto): Task {
//     const newTask: Task = this.tasksService.createTask(createTaskDto);
//     return newTask;
//   }

//   @Patch('/:id')
//   updateTask(
//     @Param('id') id: string,
//     @Body() updateTaskDto: CreateTaskDto,
//   ): Task {
//     const task = this.tasksService.getTaskById(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     return this.tasksService.updateTask(id, updateTaskDto);
//   }
}
