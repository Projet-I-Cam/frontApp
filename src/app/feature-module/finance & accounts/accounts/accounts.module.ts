import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SharedModule } from '../../../shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { IncomeComponent } from './income/income.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { ExpensesCategoryComponent } from './expenses-category/expenses-category.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { AccountsInvoicesComponent } from './accounts-invoices/accounts-invoices.component';


@NgModule({
  declarations: [
    AccountsComponent,
    ExpensesComponent,
    TransactionComponent,
    IncomeComponent,
    InvoiceComponent,
    AddInvoiceComponent,
    ExpensesCategoryComponent,
    EditInvoiceComponent,
    AccountsInvoicesComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule
  ]
})
export class AccountsModule { }
