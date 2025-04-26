import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { BlogTagsComponent } from './blog-tags/blog-tags.component';
import { AllBlogComponent } from './all-blog/all-blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'blog-categories',
        component: BlogCategoriesComponent,
      },
      {
        path: 'blog-comments',
        component: BlogCommentsComponent,
      },
      {
        path: 'blog-tags',
        component: BlogTagsComponent,
      },
      {
        path: 'all-blog',
        component: AllBlogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
