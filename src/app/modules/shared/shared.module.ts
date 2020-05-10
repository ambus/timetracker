import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IcoButtonComponent } from './layout/ico-button/ico-button.component';
import { TooltipModule } from 'primeng/tooltip';

const SHARED_MODULES = [
  CommonModule,
  ToolbarModule,
  ButtonModule,
  TooltipModule,
];
const SHARED_COMPONENTS = [IcoButtonComponent];

@NgModule({
  declarations: [IcoButtonComponent],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
})
export class SharedModule {}
