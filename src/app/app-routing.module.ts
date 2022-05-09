import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { CalenderComponent } from './calender/calender.component';
import { CalenderfullComponent } from './calenderfull/calenderfull.component';
import { FcalenderComponent } from './fcalender/fcalender.component';

const routes: Routes = [ 
    {path:'calender',component:CalenderComponent},
    {path:'calenderfull',component:CalenderfullComponent},
    {path:'fcalender',component:FcalenderComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
