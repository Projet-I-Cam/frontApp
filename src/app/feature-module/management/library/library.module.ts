import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { LibraryMembersComponent } from './library-members/library-members.component';
import { BooksComponent } from './books/books.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    LibraryComponent,
    IssueBookComponent,
    ReturnBookComponent,
    LibraryMembersComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule
  ]
})
export class LibraryModule { }
