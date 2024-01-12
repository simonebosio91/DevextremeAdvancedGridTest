import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridcomponentComponent } from './gridcomponent/gridcomponent.component';
import {
  DxActionSheetModule, DxButtonModule,
  DxContextMenuModule, DxDataGridModule,
  DxDateBoxModule,
  DxLoadPanelModule, DxTabPanelModule,
  DxTagBoxModule
} from "devextreme-angular";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    GridcomponentComponent
  ],
  imports: [
    BrowserTransferStateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    DxButtonModule,
    DxDataGridModule,
    DxTabPanelModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DxLoadPanelModule,
    DxDateBoxModule,
    DxContextMenuModule,
    DxActionSheetModule,
    MatProgressBarModule,
    MatChipsModule,
    DxTagBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
