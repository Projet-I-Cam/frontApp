import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
 public base: BehaviorSubject<string> = new BehaviorSubject<string>('');
 public page: BehaviorSubject<string> = new BehaviorSubject<string>('');
 public last: BehaviorSubject<string> = new BehaviorSubject<string>('');
 private _currency = new BehaviorSubject<string>('USD');
  public readonly currency$ = this._currency.asObservable();
  private _sidebarVisible = new BehaviorSubject<boolean>(false);

  sidebarVisible$ = this._sidebarVisible.asObservable();

  toggleSidebar() {
    this._sidebarVisible.next(!this._sidebarVisible.value);
  }
}

// Permet de lister les rôles ayant l'accès en modification sur un devoir.
export function  checkTaskName_Minedub(taskName: string): boolean {
  const allowedTasks = ['administration', 'arrondissement','departemental','regional','service_centraux','ministre'];
  return allowedTasks.includes(taskName);
}

export function  checkTaskName_Region(taskName: string): boolean {
  const allowedTasks = ['regional'];
  return allowedTasks.includes(taskName) || checkTaskName_Minedub(taskName);
}

export function  checkTaskName_Departement(taskName: string): boolean {
  const allowedTasks = ['departemental'];
  return allowedTasks.includes(taskName) || checkTaskName_Minedub(taskName);
}

export function  checkTaskName_Arrondissement(taskName: string): boolean {
  const allowedTasks = ['arrondissement'];
  return allowedTasks.includes(taskName) || checkTaskName_Minedub(taskName);
}

export function  checkTaskName_Etablissement(taskName: string): boolean {
  const allowedTasks = ['etablissement'];
  return allowedTasks.includes(taskName) || checkTaskName_Minedub(taskName);
}

export function  checkTaskName_Enseignant(taskName: string): boolean {
  const allowedTasks = ['enseignant', 'etablissement'];
  return allowedTasks.includes(taskName) || checkTaskName_Minedub(taskName);
}

export function  checkTaskName_Parent(taskName: string): boolean {
  const allowedTasks = ['parent'];
  return allowedTasks.includes(taskName);
}

export function  checkTaskName_Eleve(taskName: string): boolean {
  const allowedTasks = ['eleve'];
  return allowedTasks.includes(taskName);
}