import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from '../layout/layout.component';
import { SidebarComponent } from '../layout/components/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/components/header/header.component';

@NgModule({
  declarations: [
    MainComponent,
    LayoutComponent, SidebarComponent, HeaderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    //LayoutModule,
    TranslateModule,
    NgbDropdownModule
  ]
})
export class MainModule { }
