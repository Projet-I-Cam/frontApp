import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { BooksComponent } from './books/books.component';
import { LibraryMembersComponent } from './library-members/library-members.component';

const routes: Routes = [{ path: '', component: LibraryComponent,children:[
  {
    path: 'return-book',
    component: ReturnBookComponent,
  },
  {
    path: 'issue-book',
    component: IssueBookComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'library-members',
    component: LibraryMembersComponent,
  },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
