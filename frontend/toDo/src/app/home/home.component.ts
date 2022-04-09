import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(){

  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
    $('.ui.modal').remove();
  }

  
  
}
