import { DataSource, Repository } from "typeorm";
import { Task } from "../entity/task.entity";
import { Injectable } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
        return this.find({ where: { status } });
    }

    async getTasksBySearchTerm(search: string): Promise<Task[]> {
        return this.createQueryBuilder('task')
            .where('task.title LIKE :search OR task.description LIKE :search', {
                search: `%${search}%`,
            })
            .getMany();
    }
}