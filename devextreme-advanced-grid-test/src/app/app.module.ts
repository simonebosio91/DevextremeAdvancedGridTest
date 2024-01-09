import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxTabPanelModule,
  DxSelectBoxModule,
  DxLoadPanelModule,
  DxDateBoxModule,
  DxValidatorModule,
  DxContextMenuModule, DxActionSheetModule, DxTagBoxModule
} from 'devextreme-angular';
import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { AngularDraggableModule } from 'angular2-draggable';

import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule,
    MatTabsModule,
    DxButtonModule,
    DxDataGridModule,
    DxTabPanelModule,
    DxSelectBoxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    DxLoadPanelModule,
    DxDateBoxModule,
    DxValidatorModule,
    MatProgressSpinnerModule,
    DxContextMenuModule,
    AngularDraggableModule,
    DxReportViewerModule,
    DxActionSheetModule,
    MatProgressBarModule,
    MatChipsModule,
    DxTagBoxModule,
    CommonModule
  ],
  providers: [
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
