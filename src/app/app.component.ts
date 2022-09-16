import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ITask } from './models/task.model';
import { KanbanService } from './services/kanban.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maximizer-fe-project';
  sub!: Subscription;

  tasks!: ITask[];

  todoList!: ITask[];
  inProgressList!: ITask[];
  testingList!: ITask[];
  doneList!: ITask[];

  constructor(private kanbanService: KanbanService) { }

  ngOnInit() {
    this.sub = this.kanbanService.getTasks().subscribe({
      next: taskList => {
        this.tasks = taskList,
          this.todoList = taskList.filter(y => y.Status == 'Open'),
          this.inProgressList = taskList.filter(y => y.Status == 'InProgress'),
          this.testingList = taskList.filter(y => y.Status == 'Testing'),
          this.doneList = taskList.filter(y => y.Status == 'Close')
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
