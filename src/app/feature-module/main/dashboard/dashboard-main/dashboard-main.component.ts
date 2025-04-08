import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LoginService } from '../../../../auth/services/login.service';

@Component({
  selector: 'app-dashboard-main',
  standalone: false,
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss'
})
export class DashboardMainComponent implements OnInit {
  role: string = '';
  constructor(private loginService: LoginService) {}


  public getDashBoard(){
    if(this.loginService.isLoggedIn()){
      const user = this.loginService.getUser();
      const role = user.role.task_name;
      return role;
    }
  }
   ngOnInit(): void {
     this.role = this.getDashBoard();
  }

}
