import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommomService } from '../commom.service';
import ToDo from '../dashboard/models/toDo.interface';
import ToDoItem from './to-do-edit.interface';
import { ToDoEditService } from './to-do-edit.service';

declare var $: any;

@Component({
  selector: 'app-to-do-edit',
  templateUrl: './to-do-edit.component.html',
  styleUrls: ['./to-do-edit.component.scss']
})
export class ToDoEditComponent implements OnInit, OnDestroy {

  toDo: ToDo;
  addToDoItemForm: FormGroup;
  userLogged = "";
  toDoItem: ToDoItem;

  nestedLists: ToDoItem[] = [

  ];

  constructor(private fb: FormBuilder,
              private activedRoute: ActivatedRoute,
              private toDoEditService: ToDoEditService,
              private router: Router,
              private commomService: CommomService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe( paramMap => {
      if(paramMap.get('id')){
        this.commomService.addLoading()
        this.toDoEditService.getToDo(paramMap.get('id')).subscribe(
          data => {
            this.commomService.removeLoading()
            this.toDo = data.result;
            this.getItems();
          },
          err => {
            this.commomService.removeLoading()
            this.router.navigate(['/dashboard'])
          }
        )
      }else{
        this.router.navigate(['/dashboard'])
      }
    })
    this.addToDoItemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]]
		});
    this.commomService.addLoading()
    this.authService.verifyIfIsAuth().subscribe(
      data => {
        this.commomService.removeLoading()
        this.userLogged = data.result.userId;
      },
      err => {
        this.commomService.removeLoading()
      }
    )
  }

  get addToDoItemControl() {
		return this.addToDoItemForm.controls;
	}

  submitToDo(){
    if(this.addToDoItemForm.valid){
      if(this.toDoItem == undefined){
        var json = {
          title: this.addToDoItemControl.title.value,
          description: this.addToDoItemControl.description.value,
          toDoId: this.toDo._id,
          done: false,
        }
        this.commomService.addLoading()
        this.toDoEditService.insertItem(json).subscribe(
          data => {
            this.commomService.removeLoading()
            this.commomService.displayMessageUser('success', 'Item inserido com sucesso');
            this.getItems();
            this.closeModalAdd();
          },
          err => {
            this.commomService.removeLoading()
            this.commomService.displayMessageUser('error', 'Erro ao inserir seu item');
          }
        )
      }else{
        this.commomService.addLoading();

        this.nestedLists = this.searchItem(this.nestedLists, this.toDoItem, "title", this.addToDoItemControl.title.value);
        this.nestedLists = this.searchItem(this.nestedLists, this.toDoItem, "description", this.addToDoItemControl.description.value);

        this.onChange();
      }
    }
  }

  openModalAdd(clear = true){
    if(clear)
      this.addToDoItemForm.reset()
    $(".modal-add-to-do").modal('show');
  }

  closeModalAdd(){
    $(".modal-add-to-do").modal('hide');
    this.toDoItem = undefined;
  }

  getItems(){
    this.commomService.addLoading()
    this.toDoEditService.getAllItems(this.toDo._id).subscribe(
      data2 => {
        this.commomService.removeLoading()
        this.nestedLists = data2.result;
      },
      err => {
        this.commomService.removeLoading()
      }
    )
  }

  onChange(evt?){
    this.commomService.addLoading()
    this.toDoEditService.insertAll(this.nestedLists, this.toDo._id).subscribe(
      data => {
        this.commomService.removeLoading();
        this.closeModalAdd();
      },
      err => {
        this.commomService.removeLoading();
        this.commomService.displayMessageUser('error', 'Erro ao inserir seu item');
      }
    )
  }

  removeItem(item){
    this.commomService.addLoading();
    
    this.nestedLists = this.searchItem(this.nestedLists, item, "delete");

    this.onChange();
  }

  markAsDone(item){
    this.commomService.addLoading();

    this.nestedLists = this.searchItem(this.nestedLists, item, "done", true);

    this.onChange();
  }

  searchItem(array, item, action, value?){
    switch (action) {
      case "delete":
        array = array.filter(i => i != item)
        for(var a of array){
          if(a.children && a.children.length > 0)
            a.children = this.searchItem(a.children, item, "delete");
        }
        return array;
      case "done":
        if(array.find(i => i == item) != undefined)
          array.find(i => i == item).done = value;
        for(var a of array){
          if(a.children && a.children.length > 0)
            a.children = this.searchItem(a.children, item, "done", value);
        }
        return array;
      case "title":
        if(array.find(i => i == item) != undefined)
          array.find(i => i == item).title = value;
        for(var a of array){
          if(a.children && a.children.length > 0)
            a.children = this.searchItem(a.children, item, "title", value);
        }
        return array;
      case "description":
        if(array.find(i => i == item) != undefined)
          array.find(i => i == item).description = value;
        for(var a of array){
          if(a.children && a.children.length > 0)
            a.children = this.searchItem(a.children, item, "description", value);
        }
        return array;
      default:
        break;
    }
  }

  editToDo(model: ToDoItem){
    this.toDoItem = model;
    this.addToDoItemControl.title.setValue(model.title);
    this.addToDoItemControl.description.setValue(model.description);
    this.openModalAdd(false)
  }

  ngOnDestroy(): void {
    $('.ui.modal').remove();
  }
}
