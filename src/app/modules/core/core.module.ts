import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { 

  constructor(@Optional() @SkipSelf() parentModule: CoreModule ) {
    if(parentModule) {
      throw new Error('Core Module has alredy been loaded. Import Core modules in the AppModule only.')
    }
  }
}
