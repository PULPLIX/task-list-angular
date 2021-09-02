import { TmplAstElement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subjectShow = new Subject<any>();
  private subjectEdit = new Subject<any>();
  public taskEdited: Task;

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subjectShow.next(this.showAddTask)
  }

  editTask(task: Task): void {
    this.taskEdited = task
    this.subjectEdit.next(this.taskEdited)
    if (!this.showAddTask) {
      this.toggleAddTask();
    }
  }
  onClickEdit(): Observable<any> {
    return this.subjectEdit.asObservable();
  }
  onToggle(): Observable<any> {
    return this.subjectShow.asObservable();
  }
}
