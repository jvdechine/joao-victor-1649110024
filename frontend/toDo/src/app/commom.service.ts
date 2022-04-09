import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommomService {

  constructor() { }

  displayMessageUser(type, title, message?, autoHide = true, time = 5000) {
		document.getElementById('to-do-alert').classList.remove('close');
		document.getElementById('to-do-alert').classList.remove('success');
		document.getElementById('to-do-alert').classList.remove('error');
		document.getElementById('to-do-alert').classList.remove('info');
		document.getElementById('to-do-alert').classList.remove('hidden');
		document.getElementById('to-do-alert-description').innerHTML = "";
		if (document.getElementById('to-do-alert') != undefined) {
			document.getElementById('to-do-alert-title').innerHTML = title;
			if (message != undefined && message.length > 0)
				document.getElementById('to-do-alert-description').innerHTML = message;
			document.getElementById('to-do-alert').classList.add(type);
			if (autoHide) {
				setTimeout(() => {
					document.getElementById('to-do-alert').classList.add('close');
					document.getElementById('to-do-alert').classList.add('hidden');
				}, time)
			}
		}
	}

	addLoading(){
		document.getElementsByTagName('body')[0].classList.add('loading');	
	}

	removeLoading(){
		document.getElementsByTagName('body')[0].classList.remove('loading');	
	}
}
