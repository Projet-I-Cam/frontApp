import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  constructor() {
    this.initializeParse();
  }

  initializeParse() {
    Parse.initialize('hC9Y8NG2uLLTUVaZsoa30CW0S', '2cQBXh9nDkQDZC7J8Mu9'); 
    Parse.serverURL = 'http://5.196.68.13:1337/parse';
    // Parse.enableLocalDatastore();
  }
}