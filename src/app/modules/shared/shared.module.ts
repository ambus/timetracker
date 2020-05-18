import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IcoButtonComponent } from './layout/ico-button/ico-button.component';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

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
];
const SHARED_COMPONENTS = [IcoButtonComponent];

@NgModule({
  declarations: [IcoButtonComponent],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
})
export class SharedModule {}
