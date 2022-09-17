import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { KanbanService } from './services/kanban.service';
import { ITaskList } from './models/task-list.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sub!: Subscription;
  taskListByStatus: ITaskList[] = [];

  constructor(private kanbanService: KanbanService) { }

  ngOnInit() {
    this.sub = this.kanbanService.getTasks().pipe(
      map((x => {
        x.forEach(y => {
          y.TagsList = y.Tags.split(',')
          y.Priority = y.Priority.toUpperCase()
          y.AssigneeInitials = y.Assignee.toUpperCase().split(' ').map(z => z[0]).join('')
        })
        this.taskListByStatus.push({ tasks: x.filter(y => y.Status == 'Open'), title: 'To Do' })
        this.taskListByStatus.push({ tasks: x.filter(y => y.Status == 'InProgress'), title: 'In Progress' })
        this.taskListByStatus.push({ tasks: x.filter(y => y.Status == 'Testing'), title: 'Testing' })
        this.taskListByStatus.push({ tasks: x.filter(y => y.Status == 'Close'), title: 'Done' })
      })),
    ).subscribe();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
