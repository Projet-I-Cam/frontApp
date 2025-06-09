import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  imageLoaded = false;

  onImageLoad() { this.imageLoaded = true; }
    
  ngOnInit() {
    this.onImageLoad();
  }
}