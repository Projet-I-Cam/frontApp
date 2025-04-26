import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UsersComponent } from './users/users.component';
import { RolesPermissionComponent } from './roles-permission/roles-permission.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SharedModule } from '../../shared/shared.module';
import { PermissionComponent } from './permission/permission.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    RolesPermissionComponent,
    DeleteAccountComponent,
    PermissionComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ]
})
export class UserManagementModule { }
