import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteApi, TodoApi } from '../../../api/services/custom';
import { Note } from '../../../api/models';
import { success, error } from '../../../helpers/notification';

declare const $: any;

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})


export class NoteComponent implements OnInit {

  notes: Note[] = [];
  note = new Note();
  currentNote: Note | undefined = undefined;

  todoId = 0;
  noteLoading = false;

  formValidation: any;

  constructor(private route: ActivatedRoute,
              private  todoApi: TodoApi,
              private  noteApi: NoteApi
  ) {
    this.todoId = +this.route.snapshot.paramMap.get('id');
    this.findNotes();
  }

  ngOnInit() {
    this.formValidation = $('#createNote').parsley();
  }

  findNotes() {
    this.noteLoading = true;
    this.todoApi.getNotes(this.todoId)
      .subscribe((notes: Note[]) => {
        this.noteLoading = false;
        this.notes = notes;
      }, error1 => {
        error(error1.message);
        this.noteLoading = false;
      });
  }

  createNote(note: Note) {
    this.formValidation.whenValidate()
      .then(event => {
        $('#form-bp1').modal('hide');
        note.todoId = this.todoId;
        this.noteApi.create(note)
          .subscribe(() => {
            success('Create new note succesfull');
            this.findNotes();
          }, error1 => (error(error1.message)));
      });


  }

  deleteNote(note: Note) {
    this.noteApi.deleteById(note.id)
      .subscribe(() => {
        success('Delete note success');
        this.findNotes();
      }, error1 => error(error1.message));
  }

}
