import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommomService } from '../commom.service';
import { HeaderService } from './header.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  nameUser: string = "";
  loginForm: FormGroup;
  registerForm: FormGroup;
  @Input() showLinks: boolean = true;

  constructor(private fb: FormBuilder,
              private headerService: HeaderService,
              private commomService: CommomService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
		});

    this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
		}, {validator: this.passwordConfirming});
    this.commomService.addLoading()
    this.authService.verifyIfIsAuth().subscribe(
      data => {
        this.commomService.removeLoading()
        this.isAuthenticated = true;
        this.nameUser = data.result.name;
      },
      err => {
        this.commomService.removeLoading()
        this.isAuthenticated = false;
      }
    )
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
    if(this.loginForm.valid){
      this.commomService.addLoading()
      this.headerService.loginUser(this.loginControl.email.value, this.loginControl.password.value).subscribe(
        data => {
          this.commomService.removeLoading()
          sessionStorage.setItem('token', data.result.token)
          sessionStorage.setItem('lastTimeAuthenticated', new Date().toString())
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.commomService.removeLoading()
          this.commomService.displayMessageUser('error', err.error.message)
        }
      );
    }
  }

  submitRegister(){
    if(this.registerForm.valid){
      this.commomService.addLoading()
      this.headerService.registerUser(this.registerControl.name.value, this.registerControl.phoneNumber.value, this.registerControl.email.value, this.registerControl.password.value).subscribe(
        data => {
          this.commomService.removeLoading();
          this.commomService.displayMessageUser('success', 'Usuário cadastrado com sucesso. Por favor, faça login para acessar.')
          $('.modal-register').modal('hide');
        },
        err => {
          this.commomService.removeLoading();
          this.commomService.displayMessageUser('error', err.error.message)
        }
      );
    }
  }

  scrollToAbout(){
    document.getElementsByClassName('about-us')[0].scrollIntoView()
  }

  logout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('lastTimeAuthenticated')
    document.location.reload()
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  ngOnDestroy(): void {
    $('.ui.modal').modal("hide");
    $('.ui.modal').remove();
  }
}
