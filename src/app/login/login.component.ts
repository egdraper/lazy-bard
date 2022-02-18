import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName: string
  public password: string

  constructor() { }

  ngOnInit(): void {
  }

  public loginClick(): void {
    
  }

}
