import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Input() textEdit: string;
  @Input() daYEdit: string;
  @Input() reminderEdit: string;

  id?: number;
  text: string = "";
  day: string = "";
  reminder: boolean = false;
  showAddTask: boolean;
  suscription: Subscription;
  subscriptionEdit: Subscription;
  editTask: Task;

  constructor(private uiService: UiService) {
    this.suscription = this.uiService.onToggle().subscribe(
      (value) => {
        this.showAddTask = value;
        console.log(value);
        if(!this.uiService.taskEdited){
          this.clearForm()
        }
      })

    this.subscriptionEdit = this.uiService.onClickEdit().subscribe(
      (task) => {
        this.editTask = task;
        this.text = task.text;
        this.day = task.day;
        this.reminder = task.reminder;
        console.log(task.text);
      });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    this.onAddTask.emit(newTask);
    this.clearForm();
  }
  clearForm() {
    this.text = "";
    this.day = "";
    this.reminder = false;
  }
}
