import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  constructor(private toDoService: TodoService) { }
  toDoListArray: any[];
  ngOnInit(): void {
    this.toDoService.getToDoList().snapshotChanges()
    .this.service.function
      .subscribe(item =>{
        this.toDoListArray=[];
        item.forEach(element =>{
          var x =element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })

        //SORT
        this.toDoListArray.sort((a,b)=>{
          return a.isChecked -b.isChecked;
        })
      });

  }


    onAdd(itemTitle)
    {
      this.toDoService.addTitle(itemTitle.value);
      itemTitle.value=null;
    }
    alterCheck($key: string, isChecked){
      this.toDoService.checkOrUnCheckTitle($key,!isChecked);
    }
    onDelete($key: string)
    {
      this.toDoService.removeTitle($key)
    }
}
