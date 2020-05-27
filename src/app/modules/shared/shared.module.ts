import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IcoButtonComponent } from './layout/ico-button/ico-button.component';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

const SHARED_MODULES = [
  CommonModule,
  ToolbarModule,
  ButtonModule,
  TooltipModule,
  ReactiveFormsModule,
  CardModule,
  InputTextModule,
  ProgressBarModule,
  DynamicDialogModule,
  DropdownModule,
  FormsModule,
  DialogModule,
  ToastModule
];
const SHARED_COMPONENTS = [IcoButtonComponent];

@NgModule({
  declarations: [IcoButtonComponent],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
})
export class SharedModule {}
