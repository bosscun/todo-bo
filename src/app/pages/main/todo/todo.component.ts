import { Component, OnInit } from '@angular/core';
import { AccountApi, TodoApi } from '../../../api/services/custom';
import { Account, Todo } from '../../../api/models';
import { error, success } from '../../../helpers/notification';
import { NoteService, TodoService } from '../../../apiNestJs';

declare const $;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todo = new Todo();
  currentTodo = new Todo();
  currentAccount = new Account();

  newTodo: any[] = [];
  todoLoading = false;
  assign = Object.assign;
  accounts: Account[] = [];

  formValidation: any;

  constructor(private todoApi: TodoApi,
              private  accountApi: AccountApi,
              private  noteService: NoteService,
              private todoService: TodoService) {
    this.findTodos();
    // this.findAccounts();
  }

  ngOnInit() {
    // console.log(this.currentTodo.id);
    this.formValidation = $('#createTodo').parsley();
  }

  findTodos() {
    this.todoLoading = true;
    // this.todoApi.find({ include: { relation: 'account', scope: { fields: ['username'] } } })
    //   .subscribe((todos: Todo[]) => {
    //       this.todos = todos;
    //       this.todoLoading = false;
    //     }, error1 => {
    //       this.todoLoading = false;
    //       error(error1.message);
    //     }
    //   );

    this.todoService.todoControllerGetManyBase()
      .subscribe((data: any) => {
        this.newTodo = data;
        console.log(data);
        this.todoLoading = false;
      });

    // this.noteService.noteControllerGetManyBase(['title'], undefined, undefined, undefined, undefined,
    //   ['todo||title', 'user']
    // )
    //   .subscribe((data) => {
    //     console.log(data, 'data');
    //   });
  }

  accountEqual(a: Account, b: Account) {
    return a.id === b.id;
  }

  findAccounts() {
    this.accountApi.find()
      .subscribe((accounts: Account[]) => {
          this.accounts = accounts;
        }, error
      );
  }

  deleteTodo(todo: Todo) {
    // this.todoApi.deleteById(todo.id)
    //   .subscribe(() => {
    //     success('Delete todo success');
    //     this.findTodos();
    //   }, error);

    this.noteService.noteControllerCreateManyBase(this.todo as any )
      .subscribe((note ) => {
          this.findTodos();
        }
      );
  }

  createOrEditTodo(todo: Todo, account: Account) {
    this.formValidation.whenValidate()
      .then(() => {
          $('#form-bp1').modal('hide');
          const todo1: Todo = Object.assign({}, todo);
          todo1.accountId = account.id as any;

          if (todo1.id) {
            this.todoApi.patchAttributes(todo1.id, todo1)
              .subscribe(() => {
                  success('Edit todo sucess');
                  this.findTodos();
                }, error1 => error(error1.message)
              );
            return;
          }

          this.todoApi.create(todo1)
            .subscribe(() => {
                success('Add new todo sucess');
                this.findTodos();
              }, error1 => error(error1.message)
            );
        }
      );
  }
}
