import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
		});

    this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      name: ['', Validators.required, Validators.minLength(3)],
      phoneNumber: ['',Validators.required, Validators.minLength(9)]
		});
  }

  get loginControl() {
		return this.loginForm.controls;
	}

  get registerControl() {
		return this.registerForm.controls;
	}

  clickLogin(){
    this.loginForm.reset();
    $('.modal-login').modal('show');
  }

  clickRegister(){
    this.registerForm.reset();
    $('.modal-register').modal('show');
  }

  submitLogin(){

  }

  scrollToAbout(){
    document.getElementsByClassName('about-us')[0].scrollIntoView()
  }
}
