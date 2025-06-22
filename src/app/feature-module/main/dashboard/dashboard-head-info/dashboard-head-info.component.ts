import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';
import { routes } from '../../../../shared/routes/routes';
import { checkTaskName_Arrondissement, checkTaskName_Eleve, checkTaskName_Enseignant, checkTaskName_Minedub } from '../../../../shared/common/common.service';
import { getPersonByUserId } from '../../../../services/statefull/genericParse';
import Parse from 'parse';

@Component({
  selector: 'app-dashboard-head-info',
  standalone: false,
  templateUrl: './dashboard-head-info.component.html',
  styleUrl: './dashboard-head-info.component.scss'
})

export class DashboardHeadInfoComponent implements OnInit {
  public routes = routes;
  currentUser : any = {};
  currentPerson : any;
  isAllow : boolean = false;
  isAllowStudent : boolean = false;
  isAllowTeacher : boolean = false;

  classrooms: any = [];

   constructor(private loginService: LoginService, private router: Router){ }

    async ngOnInit() { 
       this.currentUser = this.loginService.getUser();
       this.currentPerson = await getPersonByUserId(this.currentUser.objectId);
       this.isAllow = checkTaskName_Minedub(this.currentUser?.role?.task_name);
       this.isAllowStudent = (this.currentUser?.role?.task_name == 'eleve');
       this.isAllowTeacher = (this.currentUser?.role?.task_name == 'enseignant');

       console.log('Head info User : ', this.currentUser);
       console.log('Head info Person : ', this.currentPerson);

      this.currentPerson = await this.loginService.getPerson();
      if(this.currentPerson?.user?.role?.task_name === "enseignant"){
        const queries = ['teacherChief', 'teacherSecond'].map((k: string) => {
          const q = new Parse.Query('Classroom')
          q.equalTo(k, {"__type": "Pointer", "className": "Person" , "objectId": this.currentPerson?.objectId})
          return q
        })
        const query = Parse.Query.or(...queries);
        const result = await query.find()
        console.log('Classroom Classroom Classroom Classroom ', result)
        this.classrooms = result?.map(r => r?.toJSON())
      }
   }
  
    calculateAge(birthDate: Date): number {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    return age;
  }
}