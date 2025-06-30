import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { globalGet } from '../../../../services/statefull/http';
import { LoginService } from '../../../../auth/services/login.service';
import { Router } from '@angular/router';
import { checkTaskName_Enseignant, checkTaskName_Etablissement, checkTaskName_Minedub } from '../../../../shared/common/common.service';
import { getPersonByUserId } from '../../../../services/statefull/genericParse';

@Component({
  selector: 'app-dashboard-content-info',
  standalone: false,
  templateUrl: './dashboard-content-info.component.html',
  styleUrl: './dashboard-content-info.component.scss'
})
export class DashboardContentInfoComponent implements OnInit {
  
  isAllowMinedub : boolean = false;
  isAllowEtablissement : boolean = false;
  isAllowEnseignant : boolean = false;

  public routes = routes;
   annees : any[] = [];
   anneeEnCours: any; // l'année en cours
   currentUser : any = {};
   currentPerson : any;
   totalInstitutions : any [] = [];
  
   totalInstitutionsPublics : any [] = [];
   totalInstitutionsPublicsOpen : any [] = [];
   totalInstitutionsPublicsClose : any [] = [];

   totalInstitutionsPrives : any [] = [];
   totalInstitutionsPrivesAgrees : any [] = [];
   totalInstitutionsPrivesClandestin : any [] = [];
   totalInstitutionsLaics : any [] = [];
   totalInstitutionsConf : any [] = [];
   
   totalClassesOp : any [] = [];
   totalClassesNotOp : any [] = [];
   
   totalPersons  : any [] = [];
   totalStudents : any [] = [];
   totalStudentsBoy : any [] = [];
   totalStudentsGirl : any [] = [];
   totalStudentsActive : any [] = [];
   totalStudentsInactive : any [] = [];

   totalTeachers : any [] = [];
   totalTeachersMens : any [] = [];
   totalTeachersWomens : any [] = [];
   totalTeachersActive : any [] = [];
   totalTeachersInactive : any [] = [];
   
   totalStaffs : any [] = [];
   totalStaffsMens : any [] = [];
   totalStaffsWomens : any [] = [];
   totalStaffsActive : any [] = [];
   totalStaffsInactive : any [] = [];

   // A supprimer plus tard
   value = 2;
   linkslider = '';

    constructor(private loginService: LoginService, private router: Router,) {}

     async ngOnInit() {
        this.currentUser = this.loginService.getUser();
        this.currentPerson = await getPersonByUserId(this.currentUser.objectId);
        this.isAllowMinedub = checkTaskName_Minedub(this.currentUser?.role?.task_name);
        this.isAllowEtablissement = checkTaskName_Etablissement(this.currentUser?.role?.task_name);
        this.isAllowEnseignant = checkTaskName_Enseignant(this.currentUser?.role?.task_name);
      
      // Trouver l'année en cours (isCurrent)
      this.annees = await globalGet({T: 'AcademicYear'});
      this.anneeEnCours = this.annees.find(a => a.isCurrent) || this.annees[0];

      this.totalInstitutions = await globalGet({T: 'Institution' });

      this.totalInstitutionsPublics = this.totalInstitutions.filter(x => !x.isPrivateInstitution);
      this.totalInstitutionsPublicsOpen = this.totalInstitutionsPublics.filter(x => x.isActive);
      this.totalInstitutionsPublicsClose = this.totalInstitutionsPublics.filter(x => !x.isActive);

      this.totalInstitutionsPrives = this.totalInstitutions.filter(x => x.isPrivateInstitution);
      this.totalInstitutionsLaics = this.totalInstitutionsPrives.filter(x => x.isInstitutionLaique);
      this.totalInstitutionsConf = this.totalInstitutionsPrives.filter(x => !x.isInstitutionLaique);
      this.totalInstitutionsPrivesAgrees = this.totalInstitutionsPrives.filter(x => x.isAgree);
      this.totalInstitutionsPrivesClandestin = this.totalInstitutionsPrives.filter(x => !x.isAgree)

      this.totalPersons = await globalGet({T: 'Person', includes: ['gender', 'institution']});
        
      this.totalTeachers = this.totalPersons.filter(x => x.isStaff);
      this.totalTeachersMens = this.totalTeachers.filter(x => x.gender.slug == 'male');
      this.totalTeachersWomens = this.totalTeachers.filter(x => x.gender.slug == 'female');

      this.totalStudents = this.totalPersons.filter(x => x.isStudent);
      this.totalStudentsBoy = this.totalStudents.filter(x => x.gender.slug == 'male');
      this.totalStudentsGirl = this.totalStudents.filter(x => x.gender.slug == 'female');

    
      switch(this.currentUser?.role?.task_name)
      {
        case 'administration':
          break;

        case 'regional':
          break;

            case 'departemental':
          break;

            case 'arrondissement':
          break;

        case 'etablissement':
          this.totalTeachers = this.totalTeachers.filter(x => x?.institution?.objectId == this.currentPerson?.institution?.objectId);
          this.totalTeachersMens = this.totalTeachers.filter(x => x.gender.slug == 'male');
          this.totalTeachersWomens = this.totalTeachers.filter(x => x.gender.slug == 'female');

          this.totalStudents = this.totalStudents.filter(x => x?.institution?.objectId == this.currentPerson?.institution?.objectId);
          this.totalStudentsBoy = this.totalStudents.filter(x => x.gender.slug == 'male');
          this.totalStudentsGirl = this.totalStudents.filter(x => x.gender.slug == 'female');
                  break;

        case 'enseignant':
                break;

        case 'parent':
          break;
      }
    /*
      totalClassesOp : any [] = [];
      totalClassesNotOp : any [] = [];
      
      totalStudentsActive : any [] = [];
      totalStudentsInactive : any [] = [];

      totalTeachers : any [] = [];
      totalTeachersMens : any [] = [];
      totalTeachersWomens : any [] = [];
      totalTeachersActive : any [] = [];
      totalTeachersInactive : any [] = [];
      
      totalStaffs : any [] = [];
      totalStaffsMens : any [] = [];
      totalStaffsWomens : any [] = [];
      totalStaffsActive : any [] = [];
      totalStaffsInactive : any [] = [];
    */
    }

     customFormattingFn(value: number): string {
      return value.toString();
    }
}
