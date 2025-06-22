import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-dashboard-head-info',
  standalone: false,
  templateUrl: './dashboard-head-info.component.html',
  styleUrl: './dashboard-head-info.component.scss'
})

export class DashboardHeadInfoComponent implements OnInit {
  public routes = routes;
  currentUser : any = {};
  
   constructor(private loginService: LoginService, private router: Router){ }

    async ngOnInit(){
       this.currentUser = this.loginService.getUser();
    }
}
