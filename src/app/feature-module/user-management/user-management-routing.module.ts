import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { RolesPermissionComponent } from './roles-permission/roles-permission.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UsersComponent } from './users/users.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: 'roles-permission',
        component: RolesPermissionComponent,
      },
      {
        path: 'delete-account',
        component: DeleteAccountComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'permission',
        component: PermissionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
