import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { globalGet } from '../../../../services/statefull/http';

@Component({
  selector: 'app-student-school',
  standalone: false,
  templateUrl: './student-school.component.html',
  styleUrl: './student-school.component.scss'
})
export class StudentSchoolComponent implements OnInit {
  @Input() institutionData: any;


  ngOnInit(): void {
    console.log('institutionData', this.institutionData);
      }
   }




