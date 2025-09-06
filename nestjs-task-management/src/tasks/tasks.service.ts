import { Injectable } from '@nestjs/common';
import { TaskRepository } from './repository/tasks.repository';
import { Task } from './entity/task.entity';
import { TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {

    constructor(
        private taskRepository: TaskRepository) {}

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async createTask(createTaskDto: { title: string; description: string; }): Promise<Task> {
        const { title, description } = createTaskDto;
        const newTask = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        return this.taskRepository.save(newTask);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {

    //     const { title, description } = createTaskDto;

    //     const newTask: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(newTask);
    //     return newTask;
    // }

    // getTaskById(id: string): Task | undefined {
    //     return this.tasks.find(task => task.id === id);
    // }

    // deleteTaskById(id: string): void {
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    // }

    // updateTask(id: string, updateTaskDto: CreateTaskDto): Task {
    //     const taskIndex = this.tasks.findIndex(task => task.id === id);
    //     if (taskIndex === -1) {
    //         throw new Error('Task not found');
    //     }
    //     Object.assign(this.tasks[taskIndex], updateTaskDto);
    //     return this.tasks[taskIndex];
    // }

    async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
        return this.taskRepository.getTasksByStatus(status);
    }

    async getTasksBySearchTerm(search: string): Promise<Task[]> {
        return this.taskRepository.getTasksBySearchTerm(search);
    }
}
