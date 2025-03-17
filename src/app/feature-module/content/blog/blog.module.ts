import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { SharedModule } from '../../../shared/shared.module';
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { BlogTagsComponent } from './blog-tags/blog-tags.component';


@NgModule({
  declarations: [
    BlogComponent,
    AllBlogComponent,
    BlogCategoriesComponent,
    BlogCommentsComponent,
    BlogTagsComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
