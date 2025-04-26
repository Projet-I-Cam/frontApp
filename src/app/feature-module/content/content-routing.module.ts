import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { PagesComponent } from './pages/pages.component';
import { FaqComponent } from './faq/faq.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./location/location.module').then((m) => m.LocationModule),
      },
      {
        path: 'pages',
        component: PagesComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'testimonials',
        component: TestimonialsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
