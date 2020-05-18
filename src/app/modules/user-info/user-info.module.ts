import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class UserInfoModule { }
