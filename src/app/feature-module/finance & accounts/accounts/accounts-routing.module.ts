import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TransactionComponent } from './transaction/transaction.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { IncomeComponent } from './income/income.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { ExpensesCategoryComponent } from './expenses-category/expenses-category.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { AccountsInvoicesComponent } from './accounts-invoices/accounts-invoices.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'connected-apps',
        component: ExpensesComponent,
      },
      {
        path: 'transactions',
        component: TransactionComponent,
      },
      {
        path: 'income',
        component: IncomeComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'add-invoice',
        component: AddInvoiceComponent,
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
      },
      {
        path: 'expenses-category',
        component: ExpensesCategoryComponent,
      },
      {
        path: 'edit-invoice',
        component: EditInvoiceComponent,
      },
      {
        path: 'accounts-invoices',
        component: AccountsInvoicesComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
