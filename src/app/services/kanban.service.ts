import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task.model';

@Injectable()
export class KanbanService {
    constructor(private httpClient: HttpClient) { }

    getTasks() {
        return this.httpClient.get<ITask[]>('https://ej2services.syncfusion.com/production/web-services/api/Kanban');
    }

}