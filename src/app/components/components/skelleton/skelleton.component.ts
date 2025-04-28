import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skelleton',
  templateUrl: './skelleton.component.html',
  styleUrls: ['./skelleton.component.scss']
})
export class SkelletonComponent {
  @Input() table: [] = [];
  @Input() title: string = "";
  datas: any= [];
  cols: any[] = [];
}
