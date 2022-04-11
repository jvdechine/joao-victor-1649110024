import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommomService } from '../commom.service';
import { DashboardService } from './dashboard.service';
import ToDo from './models/toDo.interface';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  addToDoForm: FormGroup;
  toDos: ToDo[];
  constructor(private fb: FormBuilder,
              private dashBoardService: DashboardService,
              private commomService: CommomService,
              private router: Router) { }

  ngOnInit(): void {
    $('.ui.modal').hide();
    this.addToDoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      color: ['#440381']
		});
    this.commomService.addLoading();
    this.dashBoardService.getToDos().subscribe(
      data => {
        this.commomService.removeLoading()
        this.toDos = data.result
      },
      err => {
        this.commomService.removeLoading()
        this.commomService.displayMessageUser('error', "Erro ao recuperar os ToDo's")
      }
    )
  }

  get addToDoControl() {
		return this.addToDoForm.controls;
	}

  submitToDo(){
    if(this.addToDoForm.valid){
      this.commomService.addLoading()
      this.dashBoardService.addToDo(this.addToDoControl.name.value, this.getRandomColor()).subscribe(
        data => {
          this.commomService.removeLoading()
          this.closeModalAdd();
          this.edit(data.result._id)
        },
        error => {
          this.commomService.removeLoading()
          this.commomService.displayMessageUser('error', error.error?.message)
        }
      )
    }
  }

  openModalAdd(){
    $(".modal-add-to-do").modal('show');
  }

  closeModalAdd(){
    $(".modal-add-to-do").modal('hide');
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  edit(id){
    this.router.navigate([`/edit-to-do/${id}`]);
  }

  share(toDo: ToDo){
    window.location.href = `mailto:?subject=${encodeURIComponent(`Edite meu To Do: ${toDo.name}`)}&body=${encodeURIComponent(`Acesse no link: ${document.location.origin}/edit-to-do/${toDo._id}`)}`;
  }

  ngOnDestroy(): void {
    $('.ui.modal').remove();
  }

}
