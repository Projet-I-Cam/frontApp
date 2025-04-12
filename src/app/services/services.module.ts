import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StudentService } from './student.service';
import { PersonService } from './person.service';
import { ClassService } from './class.service';
import { InstitutionService } from './institution.service';
import { CampusService } from './campus.service';
import { LocationService } from './location.service';
import { ParseService } from '../parse.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ParseService,
    StudentService,
    PersonService,
    ClassService,
    InstitutionService,
    CampusService,
    LocationService
  ],
})
export class ServicesModule { } 