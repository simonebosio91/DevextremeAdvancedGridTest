import {Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import {DatiService} from "../service/dati.service";
import {EvoDataTypes, EvoTypes, relationsStruct} from "../model/griglia.model";
import {StrutturaService} from "../service/struttura.service";
import {UtilityService} from "../service/utility.service";
import {DxDataGridComponent} from "devextreme-angular";
import {Workbook} from "exceljs";

import { exportDataGrid } from 'devextreme/excel_exporter';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-gridcomponent',
  templateUrl: './gridcomponent.component.html',
  styleUrls: ['./gridcomponent.component.scss']
})
export class GridcomponentComponent implements OnInit {

  @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;

  title = 'devextreme-advanced-grid-test';

  strutturaGriglia: any = null;
  datasource: any = null;
  advMasterDetail_subgridLoaded: any[] = [];
  relations?: relationsStruct[];

  evoTypes = EvoTypes;
  evoDataTypes = EvoDataTypes;
  gridHeight: number;
  noDataText = 'Nessun dato';
  gridFontSize: number = 14;

  loaded: boolean = false;

  resizeObserver: ResizeObserver;

  constructor(
    private _strutturaService: StrutturaService,
    private _datiService: DatiService,
    private _utilityService: UtilityService
  ) {
    this.resizeObserver = new ResizeObserver(() => {
      this.dataGrid.instance.updateDimensions();
    })
  }

  async ngOnInit() {
    this.strutturaGriglia = this._strutturaService.estraiStruttura();
    this.datasource = this._datiService.estraiDatiPrincipale();

    this.strutturaGriglia.Schema.Columns = await this._utilityService.ProcessGridStructByType(this.strutturaGriglia.Schema.Columns, '');

    this.relations = this.strutturaGriglia.Schema.Relations;
    this.loaded = true;
  }


  selectAll(){
    this.dataGrid.instance.selectAll();
  }
  unselectAll(){
    this.dataGrid.instance.deselectAll();
  }

  onContentReady(e:any){
    const fixedTable = e.element.querySelector(".dx-datagrid-rowsview .dx-datagrid-content-fixed > table");
    this.resizeObserver.unobserve(fixedTable);
    this.resizeObserver.observe(fixedTable);
  }

  onEditorPreparing(e: any): void {
      if (e.parentType == 'filterRow') {
      }
      if (e.parentType=='headerRow' && e.command=='select') {
          e.editorElement.remove();
      }
  }
  onDisposing(e){
    this.resizeObserver.disconnect();
  }
  onRowExpanding(e: any) {

  }
  onRowExpandingChild(e: any) {

  }
  onRowPrepared(e: any): void {
      if (e.rowType == 'header') {
          e.rowElement.setAttribute('height', '25');
      } else if (e.rowType == 'data') {
          e.rowElement.setAttribute('height', '10');
          if (e.data['Relations'] == null && e.cells != null && e.cells[1].cellElement != null) {
              e.cells[1].cellElement.classList.remove('dx-datagrid-expand');
              e.cells[1].cellElement.childNodes[0].classList.remove('dx-datagrid-group-closed');
          } else {
              if (e.cells[1].cellElement != null) {
                  let checkValue: boolean = false;
                  for (let singolo of e.data['Relations']) {
                      if (singolo.NumRecs > 0) {
                          checkValue = true;
                      }
                  }
                  if (checkValue == true) {
                      e.cells[1].cellElement.childNodes[0].classList.add('dx-datagrid-group-closed-sifile');
                  } else {
                      e.cells[1].cellElement.classList.remove('dx-datagrid-expand');
                      e.cells[1].cellElement.childNodes[0].classList.remove('dx-datagrid-group-closed');
                  }
              }
          }
      }
  }
  onCellPrepared(e: any){
      if (e.rowType === "data")
          e.cellElement.style.fontSize = this.gridFontSize + "px";
  }
  onCellPreparedChild(e: any){
      if (e.rowType === "data")
          e.cellElement.style.fontSize = this.gridFontSize + "px";
  }

  //ESTRAI
  estraiListaColore(rowData) {
      let column = this as any;
      if (!column.visible) {
          return '';
      }
      let objLista = rowData[column.dataField];
      let valore = objLista[column.dataField + '_BackColor'];
      if(valore == 0){
          return -1;
      }else{
          return ToHex(objLista[column.dataField + '_BackColor']);
      }
  }
  estraiListaColoreConTesto(rowData){
      let column = this as any;
      if (!column.visible) {
          return '';
      }
      let objLista = rowData[column.dataField];
      let valoreBck = objLista[column.dataField + '_BackColor'];
      let valoreFore = objLista[column.dataField + '_ForeColor'];

      let valoreBckHex = '';
      let valoreForeHex = '';

      if(valoreBck == 0){
          valoreBckHex = 'rgba(255,255,255, 0.9)';
      }else{
          valoreBckHex = ToHex(valoreBck);
      }
      if(valoreFore == 0){
          valoreForeHex = 'rgba(0,0,0,0.9)';
      }else{
          valoreForeHex = ToHex(valoreFore);
      }

      return {
          Background: valoreBckHex,
          Foreground: valoreForeHex
      };
  }
  estraiListaTesto(rowData) {
      let column = this as any;
      if (!column.visible) {
          return '';
      }
      let objLista = rowData[column.dataField];
      return objLista[column.dataField + '_DisplayText'];
  }
  estraiEstensioneHeader(column: any){
      let ipEndpoint: string = sessionStorage.getItem('ipEndPoint');
      let filterColumn = this.strutturaGriglia.Schema.Columns.filter(x=>x.Name == column.name);
      let tmpExtension = filterColumn[0].DocCategory;
      let tmpType = filterColumn[0].DocumentType;
      if(tmpType != null){
          if(tmpType == 'EditXML' || tmpType == 'EditPDF'){
              tmpExtension = 'PDF';
          }
      }
      let immagine: string = '';
      try{
          if(isDevMode()){
              immagine = '../../../../../assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }else{
              immagine = ipEndpoint + '/assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }
      }catch(e){
          if(isDevMode()){
              immagine = '../../../../../assets/icons/document/NULL.svg';
          }else{
              immagine = ipEndpoint + '/assets/icons/document/NULL.svg';
          }
      }
      return immagine;
  }
  estraiEstensione(rowData, componentInstance) {
      let column = this as any;
      if (!column.visible) {
          return '';
      }
      let tmpColumn = column.dataField + '_EXT';
      let value: Boolean = rowData[column.dataField];
      let tmpExtension: string = rowData[tmpColumn];
      let immagine: string;
      let ipEndpoint: string = sessionStorage.getItem('ipEndPoint');
      if (value) {
          if(isDevMode()){
              immagine = '../../../../../assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }else{
              immagine = ipEndpoint + '/assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }
      } else {
          immagine = '';
      }
      return immagine;
  }
  estraiValoreAllegati(rowData) {
      let column = this as any;
      let tmpColumn = column.dataField + 'Count';
      let valore: number = rowData[tmpColumn];
      let ipEndpoint = sessionStorage.getItem('ipEndPoint');
      if (valore > 0) {
          if(isDevMode()){
              return '../../../../../assets/icons/document/attach.svg';
          }else{
              return ipEndpoint + '/assets/icons/document/attach.svg';
          }
      } else {
          return '';
      }
  }
  estraiValoreNote(rowData) {
      let column = this as any;
      if (!column.visible) {
          return '';
      }
      let tmpColumn = column.dataField;
      let valore: string = String(rowData[tmpColumn]);
      let ipEndpoint = sessionStorage.getItem('ipEndPoint');
      if (valore == 'true') {
          if(isDevMode()){
              return '../../../../../assets/icons/document/chat.svg';
          }else{
              return ipEndpoint + '/assets/icons/document/chat.svg';
          }

      } else {
          return '';
      }
  }
  estraiValoreInDatatime(rowData) {
      let column = this as any;
      let appoVal = rowData[column.dataField];
      if (appoVal == null) {
          return null;
      } else {
          return new Date(appoVal);
      }
  }
  estraiAllegatiHeader() {
      let ipEndpoint = sessionStorage.getItem('ipEndPoint');
      if(isDevMode()){
          return '../../../../../assets/icons/document/attach.svg';
      }else{
          return ipEndpoint + '/assets/icons/document/attach.svg';
      }
  }
  creaPuntoColorato(d) {
      return {
          'height': '16px',
          'width': '16px',
          'background-color': d,
          'border-radius': '50%',
          'display': 'inline-block'
      };
  }

  //CLICK VARI
  async openMenu(event, recordData: any) {
  }
  eseguiComandoRapido(event, recordData: any){
  }
  async openAttach(rowData: any) {
  }
  async openNote(rowData) {
  }

  //SOTTOGRIGLIE
  estraiEstensioneHeaderSubgrid(column: any, gridId: string, dsRecordIdMaster: number, subkey:any){
      let ipEndpoint: string = sessionStorage.getItem('ipEndPoint');
      let loadedSubGrid = this.getLoadedSubGrid(dsRecordIdMaster,subkey);
      let struct = loadedSubGrid.Struct;
      let filterColumn = struct.filter(x=>x.Name == column.name);
      let tmpExtension = filterColumn[0].DocCategory;
      let tmpType = filterColumn[0].DocumentType;
      if(tmpType != null){
          if(tmpType == 'EditXML' || tmpType == 'EditPDF'){
              tmpExtension = 'PDF';
          }
      }
      let immagine: string = '';
      try{
          if(isDevMode()){
              immagine = '../../../../../assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }else{
              immagine = ipEndpoint + '/assets/icons/document/' + tmpExtension.toUpperCase() + '.svg';
          }
      }catch(e){
          if(isDevMode()){
              immagine = '../../../../../assets/icons/document/NULL.svg';
          }else{
              immagine = ipEndpoint + '/assets/icons/document/NULL.svg';
          }
      }
      return immagine;
  }

  getNavigationIndexForDsRecord(dsRecordId: number){
      if(this.advMasterDetail_subgridLoaded == null || this.advMasterDetail_subgridLoaded.length == 0){return -1}
      let findByDsRecord = this.advMasterDetail_subgridLoaded.filter(x => x.DsRecordId == dsRecordId);
      if(findByDsRecord.length > 0){
          return this.advMasterDetail_subgridLoaded.indexOf(findByDsRecord[0]);
      }else{
          return -1;
      }
  }
  getNavigationIndexForSubKey(indexOfDsRecordLoaded: number, subkey: string){
      if(this.advMasterDetail_subgridLoaded == null || this.advMasterDetail_subgridLoaded.length == 0){return -1}
      let findBySubKey = this.advMasterDetail_subgridLoaded[indexOfDsRecordLoaded].ObjectGrid.filter(x => x.SubViewKey == subkey);
      if(findBySubKey.length > 0){
          return this.advMasterDetail_subgridLoaded[indexOfDsRecordLoaded].ObjectGrid.indexOf(findBySubKey[0]);
      }else{
          return -1;
      }
  }
  getLoadedSubGrid(dsRecordId: number, subkey: string){
      let indexOfDsRecordLoaded = this.getNavigationIndexForDsRecord(dsRecordId);
      if(indexOfDsRecordLoaded != -1){
          let indexOfObjectGrid = this.getNavigationIndexForSubKey(indexOfDsRecordLoaded,subkey);
          if(indexOfObjectGrid != -1){
              return this.advMasterDetail_subgridLoaded[indexOfDsRecordLoaded].ObjectGrid[indexOfObjectGrid].LoadedSubGrid;
          }else{
              return null;
          }
      }else{
          return null;
      }
  }


  calcRelationValue(datiRow, colonneRelazione:any[],parentStruct:any[]){
      let relationCompiled: any[] = [];
      for (let singola of colonneRelazione) {
          let filterStruct = parentStruct.filter(x=>x.Name == singola);
          let type = (typeof (datiRow.data[singola]));
          let valore;
          if (type == 'object') {
              let obj = datiRow.data[singola];
              valore = obj[singola + '_Value'];
          } else {
              if(filterStruct[0].DataType == EvoDataTypes.Date || filterStruct[0].DataType == EvoDataTypes.Datetime){
                  let defaultLocale: string = 'en-US';
             //     valore = formatDate(datiRow.data[singola],'dd/MM/yyyy',defaultLocale);
                  //23-06-2023: Prima era yyyy/MM/dd però nel db di Makro con una relazione sulla data andava in errore di conversione
              }else{
                  valore = datiRow.data[singola];
              }
          }
          let singleRelation = {
              ColName: singola,
              ColValue: valore
          };
          relationCompiled.push(singleRelation);
      }
      return relationCompiled;
  }

  createObjOptions(title: string, subkey: string, relations: any[], viewId: string, attachManagement:boolean, attachView:boolean, volumeId: string, historyView: boolean, datiRow: any, datiRelation: any){
      return {
          Title: title,
          SubKey: subkey,
          Relations: relations,
          ViewId: viewId,
          AttachManagement: attachManagement,
          AttachView: attachView,
          VolumeId: volumeId,
          EnableTraceability: historyView,
          DatiRow: datiRow,
          DatiRelation: datiRelation
      };
  }

  tabContentReady(e,datiRow: any){
      let indiceTab = Number(sessionStorage.getItem('tabSelected'));
      if( e.component._userOptions.dataSource.length > 0){
          let singolo = e.component._userOptions.dataSource[0];
          if(this.getLoadedSubGrid(datiRow.data.DsRecordId, singolo.SubViewKey) == null){
              this.doOpenSubGridFirstLevel(singolo, datiRow);
          }
      }
  }
  async doOpenSubGridFirstLevel(relation: any, datiRow, multiRow = false) {
      let dsRecordId = datiRow.data['DsRecordId'];
      let subVolumeId = relation.VolumeId;
      let subViewId = relation.ViewId;
      let subViewKey = relation.SubViewKey;

      let parentStruct = this.strutturaGriglia.Schema.Columns;
      let relationSelected = ((this.relations).filter(x => x.Key == subViewKey))[0];
      let colonneRelazione: string[] = relationSelected.Columns;
      let relationCompiled: any[] = this.calcRelationValue(datiRow, colonneRelazione, parentStruct);

      let data = !multiRow ? this._datiService.estraiDatiSubGridUnaRiga() : this._datiService.estraiDatiSubGridMultiRow();
      let subStruct = await this._utilityService.ProcessGridStructByType(data.Schema.Columns, subViewId);
      let gridHeight = window.innerHeight - 138;

      let dataSourceCustom = data.Data.data;
      dataSourceCustom.forEach((element: any) => {
          element._SubKey = subViewKey
      });

      let objPath = this.createObjOptions(
          data.Schema.Title,
          subViewKey,
          data.Schema.Relations,
          subViewId,
          data.Schema.AttachManagement,
          data.Schema.AttachView,
          subVolumeId,
          data.Schema.HistoryView,
          datiRow,
          relation
      );

      let loadedSubGrid = {
          Struct: subStruct,
          Data: dataSourceCustom,
          Relations: data.Schema.Relations,
          Subkey: subViewKey,
          GridHeight: gridHeight,
          EnableAutoWidthColumn: -1,
          GridId: 'PIPPO' + '_' + dsRecordId + '_' + subViewKey,
          ShowSearch: false,
          DsRecordIdMaster: dsRecordId,
          RelationMaster: relation,
          Options: objPath
      };

      let objActive = {
          SubViewKey: subViewKey,
          LoadedSubGrid: loadedSubGrid
      }

      let indexByDsRecord = this.getNavigationIndexForDsRecord(dsRecordId);
      if (indexByDsRecord != -1) {
          let indexBySubKey = this.getNavigationIndexForSubKey(indexByDsRecord, subViewKey);
          if (indexBySubKey != -1) {
              this.advMasterDetail_subgridLoaded[indexByDsRecord].ObjectGrid[indexBySubKey] = objActive;
          } else {
              this.advMasterDetail_subgridLoaded[indexByDsRecord].ObjectGrid.push(objActive);
          }
      } else {
          this.advMasterDetail_subgridLoaded.push({
              DsRecordId: dsRecordId,
              ObjectGrid: [objActive]
          });
      }
  }

  cambioTabSubgridFirstLevel(e, datiRow: any){
      let singolo = e.addedItems[0];
      if(this.getLoadedSubGrid(datiRow.data.DsRecordId, singolo.SubViewKey) == null){
          this.doOpenSubGridFirstLevel(singolo, datiRow,true);
      }
  }

  openSearchInSubgrid(dsRecordId: number, subkey: string){
      let indexOfDsRecordLoaded = this.getNavigationIndexForDsRecord(dsRecordId);
      if(indexOfDsRecordLoaded != -1){
          let indexOfObjectGrid = this.getNavigationIndexForSubKey(indexOfDsRecordLoaded,subkey);
          if(indexOfObjectGrid != -1){
              this.advMasterDetail_subgridLoaded[indexOfDsRecordLoaded].ObjectGrid[indexOfObjectGrid].LoadedSubGrid.ShowSearch = !this.advMasterDetail_subgridLoaded[indexOfDsRecordLoaded].ObjectGrid[indexOfObjectGrid].LoadedSubGrid.ShowSearch;
          }
      }
  }


  async exportSelectedData() {
    let selectedRows = this.dataGrid.instance.getSelectedRowsData();
    if (selectedRows.length == 0) {
      await this.dataGrid.instance.selectAll();
    }

    await this.onExportingAsync();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
      // @ts-ignore
      component: this.dataGrid.instance,
      worksheet: worksheet,
      selectedRowsOnly: true,
      autoFilterEnabled: true,
      customizeCell: ({ gridCell, excelCell }) => {
        if (gridCell.rowType === 'data') {
          if(gridCell.column.cellTemplate == 'cellListColorTemplate' || gridCell.column.cellTemplate == 'cellListTextTemplate'){
            let dtfield: string = gridCell.column.dataField;
            let dtFieldDisplay: string = dtfield + '_DisplayText';
            excelCell.value = gridCell.data[dtfield][dtFieldDisplay];
          }
        }
      }
    }).then(() => {
      workbook.xlsx.writeBuffer()
        .then(async function (buffer: BlobPart) {
          saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
      this.onExported();
    });
  };


  onExportingAsync():Promise<boolean> {
    return new Promise<boolean>((resolve => {
      this.dataGrid.instance.beginUpdate();

      let columnVisible = this.dataGrid.instance.getVisibleColumns();
      for (var i = 0; i < columnVisible.length; i++) {
        if (columnVisible[i].cellTemplate != null) {
          switch (columnVisible[i].cellTemplate) {
            case 'commandTemplate':{
              // appoGriglie[index].instance.columnOption(columnVisible[i].visibleIndex, 'visible', false);
              this.dataGrid.instance.columnOption('colCommand', 'visible', false);
              break;
            }
            case 'cellListColorTemplate': {
              break;
            }
            case 'cellTemplate': {
              this.dataGrid.instance.columnOption(columnVisible[i].dataField, 'visible', false);
              break;
            }
            case 'cellAttachTemplate': {
              this.dataGrid.instance.columnOption(columnVisible[i].dataField, 'visible', false);
              break;
            }
            case 'cellNoteTemplate': {
              this.dataGrid.instance.columnOption(columnVisible[i].dataField, 'visible', false);
              break;
            }
            case 'cellListTextTemplate': {
              break;
            }
          }
        }
      }
      resolve(true);
    }))
  }

  onExported() {
    let cols: any[] = this.dataGrid.instance.option('columns');
    for (var i = 0; i < cols.length; i++) {
      if (cols[i].cellTemplate != null) {
        switch (cols[i].cellTemplate) {
          case 'commandTemplate':{
            this.dataGrid.instance.columnOption('colCommand', 'visible', true);
            break;
          }
          case 'cellListColorTemplate': {
            break;
          }
          case 'cellTemplate': {
            this.dataGrid.instance.columnOption(cols[i].dataField, 'visible', true);
            break;
          }
          case 'cellAttachTemplate': {
            this.dataGrid.instance.columnOption(cols[i].dataField, 'visible', true);
            break;
          }
          case 'cellNoteTemplate': {
            this.dataGrid.instance.columnOption(cols[i].dataField, 'visible', true);
            break;
          }
          case 'cellListTextTemplate': {
            break;
          }
        }
      }
    }
    this.dataGrid.instance.endUpdate();
  }

  protected readonly exportDataGrid = exportDataGrid;
}


function ToHex(num) {
  num >>>= 0;
  const b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16,
    a = ((num & 0xFF000000) >>> 24) / 255;
  return "rgba(" + [r, g, b, a].join(",") + ")";
}
