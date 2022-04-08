import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  verifyConfirm() {
    return document.getElementById('to-do-alert').classList.contains('confirm') || document.getElementById('to-do-alert').classList.contains('info')
  }

  hide() {
    document.getElementById('to-do-alert').classList.add('close');
    document.getElementById('to-do-alert').classList.add('hidden');
  }

}
