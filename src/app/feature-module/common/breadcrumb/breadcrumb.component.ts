import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { routes } from '../../../shared/routes/routes';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  standalone : false,
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() separator = '/';
  public breadcrumbs: IBreadCrumb[] = [];
  public routes = routes;
  currentUser : any = {};
  taskName = '';

  constructor(private loginService : LoginService, private router: Router, private activatedRoute: ActivatedRoute) {}

   ngOnInit(): void {
      this.currentUser = this.loginService.getUser();
      this.taskName = this.currentUser?.role?.task_name;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    }); 
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    const path = route.routeConfig?.path ?? '';
    const breadcrumb = route.routeConfig?.data?.['breadcrumb'];

    if (breadcrumb) {
      breadcrumbs.push({ label: breadcrumb, url: url + (url ? '/' : '') + path });
    }

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, url + (url ? '/' : '') + path, breadcrumbs);
    }

    return breadcrumbs;
  }
}

export interface IBreadCrumb {
  label: string;
  url: string;
}
