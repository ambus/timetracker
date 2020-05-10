import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

const SHARED_MODULES = [
  CommonModule,
  ToolbarModule,
  ButtonModule
]


@NgModule({
  declarations: [],
  imports: [
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
