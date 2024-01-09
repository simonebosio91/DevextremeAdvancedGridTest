import { Guid } from 'guid-typescript';

export class grigliaStruct {
  ColId: number;
  Name: string;
  Title: string;
  Type: number;
  DataType: number;
  FormatMask: string;
  Width: number;
  HAlign: number;
  Attributes: number;
  ViewId: string;
  GridDataType ?: string;
  HideOnCard ?: boolean;
  DocId?: number;
  DocColumnName?: string;
  FormatMaskAdv?: any;
  SearchEnabled?: boolean;
  ListId?: string;
  EnableFullText?: boolean;
  MultiSelection?:boolean;
  DocCategory?:string;
  DocumentType?:string;
}



export class tabGriglie{
  idOpenUnique: Guid;
  id: string;
  title: string;
  filter: string;
  // pageSize: number;
  dataSourceGriglia: any;
  structGriglia: grigliaStruct[];
  commands: comandoRiga[];
  groupPanel?: Boolean;
  modeActive?: string;
  viewId: string;
  volumeId: string;
  scheda_colonneNote?: noteColumn[];
  scheda_colonneAllegati?: boolean;
  scheda_structScheda?: schedaStruct[];
  scheda_commands?: comandoRiga[];
  scheda_colDocClick?: openDocumentElement;
  scheda_docPresent?: boolean;
  scheda_DisablePreview?: boolean;
  scheda_recordsObj: any[];
  titleTemplate?:string;
  recordCount?:number;
  relations?: relationsStruct[];
  showAllRecord?: boolean;

  warningRefresh?: boolean;

  subgrid_MasterParentId?: string;        //PRIMO LIVELLO PADRE RADICE FISSO
  subgrid_MasterParentRecId?: number;     //RECID DEL PADRE
  subgrid_MasterSubKey?: string;          //SUBKEY DEL PADRE - PADRE
  subgrid_MasterRelationsValue?: any[];

  //SOTTOLIVELLI
  subgrid_ParentId?: string;              //ID DEL PADRE
  subgrid_ParentRecId?: number;           //PER ME NON SERVE
  subgrid_SubKey?: string;                //SUBKEY DEL PADRE
  subgrid_RelationsValue?: any[];
  subgrid_attachManagement?: boolean;
  subgrid_attachView?: boolean;
  noDataText?: string;

  elencoProfili?: grigliaProfile[];

  attachManagement?: boolean;
  attachView?: boolean;

  filterGridValue?: any;
  filterActive?: boolean;
  smartFilterText?: string;
  fullTextFilterElement?: any[];
  fullTextFilterText?: string;

  visibleColumnsDefault?: any[];

  reportUrl?: string;
  reportInvoke?: string;
  reportHost?: string;

  previewViewId?: string;
  previewRecId?: number;
  previewDocOpen?: openDocumentElement;
  previewMaster?: string;
  previewKey?: string;
  previewPadre?: boolean;
  isDuplicate?: boolean;

  enableSmartFilter?: boolean;
  enableAutoWidthColumn?: boolean;

  enableTabTooltip?: boolean;

  maskData?: any;             //maschera di modifica
  maskEnableAttach?: boolean; //maschera di modifica
  maskEnableNotes?: boolean;  //maschera di modifica
  maskEnablePreviewDoc?: boolean; //maschera di modifica
  maskEnableUploadDoc?: boolean; //maschera di modifica
  maskNoteColums?: noteColumn[];

  commandType?: number;
  commandId?: number;
  originTabId?: Guid;

  enableDblClickCommand?: boolean;
  dblClickCommand?: comandoRigaDev;
  addCommandsForTab?: comandoRigaDev[];
  addCommandsNode: any[];

  operationInProgress: boolean;
  operationInProgressTitle: string;
  operationInProgressText: string;
  operationObjSelection: any;
  advMasterDetail_schemaGriglia: any;
  advMasterDetail_dataGriglia: any;
  advMasterDetail_activeObj: any;
  advMasterDetail_subgridLoaded: any[];

  gridHeight: number;
  dashboardUpdateRun: boolean;
  enableTraceability: boolean;

  lockId: number;

  enableFullTextSearch: boolean;
  constructor(
    idOpenUnique: Guid,
    id: string,
    title: string,
    filter: string,
    // pagesize: number,
    dataSourceGriglia: any,
    structGriglia: grigliaStruct[],
    commands: comandoRiga[],
    modeActive: string,
    viewId: string,
    volumeId: string
  ) {
    this.idOpenUnique = idOpenUnique;
    this.id = id;
    this.title = title;
    this.filter = filter;
    this.dataSourceGriglia = dataSourceGriglia;
    this.structGriglia = structGriglia;
    // this.pageSize = pagesize;
    this.commands = commands;
    this.groupPanel = false;
    this.modeActive = modeActive;
    this.viewId = viewId;
    this.volumeId = volumeId;
    this.scheda_colonneNote = [];
    this.scheda_colonneAllegati = false;
    this.scheda_structScheda = [];
    this.scheda_commands = [];
    this.scheda_colDocClick = null;
    this.titleTemplate = '';
    this.recordCount = 0;
    this.filterGridValue = null;
    this.filterActive = false;
    this.elencoProfili = [];
    this.visibleColumnsDefault = [];
    this.isDuplicate = false;
    this.enableSmartFilter = false;
    this.enableAutoWidthColumn = false;
    this.advMasterDetail_subgridLoaded = [];
  }
}

export class grigliaProfile{
  ProfileName: string;
  IsDefault: boolean;
  Profile: any

  constructor(ProfileName: string, IsDefault: boolean, Profile: any) {
    this.ProfileName = ProfileName;
    this.IsDefault = IsDefault;
    this.Profile = Profile;
  }
}

export class comandoRiga {
  CmdId: number;
  CmdType: number;
  Title: string;
  Items?: comandoRiga[];
  Disabled?: boolean;
}

export class comandoRigaDev {
  text: string;
  cmdId: number;
  cmdType: number;
  disabled: boolean;
  items: comandoRigaDev[];
  isAddCommand: boolean;
}


export class schedaStruct {
  ColId: number;
  Name: string;
  Title: string;
  Type: number;
  DataType: number;
  FormatMask: string;
  Width: number;
  HAlign: number;
  Attributes: number;
  Element: number;
  DisableDocPreview?: boolean;
  Value?:any;
  MultiSelection?:boolean;
}

export class schedaDocumenti {
  DocVisible: boolean;
  DocTypeCode_EXT: string;
  DocTooltip: string;
  DocColumnName: string;
  DocId: number;
  SelectionCheck?:boolean;
  Exportable: boolean;
  Importable:  boolean;
  Openable:  boolean;
  Printable:  boolean;
  Sendable:  boolean;
}

export class noteColumn {
  ViewId: string;
  RecId: number;
  ColId: number;
  Title: string;
}

export class openDocumentElement {
  DocId: number;
  DocColumnName: string;
  DocTooltip: string;
  Exportable?: boolean;
  Importable?:  boolean;
  Openable?:  boolean;
  Printable?:  boolean;
  Sendable?:  boolean;
}

export class relationsStruct {
  ViewId: string;
  ViewTitle: string;
  Key: string;
  Columns: string[];
}

export class signatureFile{
  Type: 'p7m' | 'pades' | 'tsd';
  SigningTime: Date;
  SignatureInfo: signatureInfoPades[] | signatureInfoP7m[] | signatureInfoTSD[];
}

export class signatureInfoPades{
  AuthorName: string;
  SignatureName: string;
  SigningTime: Date;
}

export class signatureInfoP7m{
  SubjectName: p7mNames;
  IssuerName: p7mNames;
  CertValidFrom: Date;
  CertValidTo: Date;
}
export class signatureInfoTSD{
  SubjectName: p7mNames;
  IssuerName: p7mNames;
  CertValidFrom: Date;
  CertValidTo: Date;
  TsdControlSerialNumber: string;
  TsdControlTsaName: string;
}

export class p7mNames{
  Country: string;
  StateOrProvince: string;
  Locality: string;
  Organization: string;
  OrganizationUnit: string;
  CommonName: string;
  EMailAddress: string;
}

export class tsdNames{
  Country: string;
  Organization: string;
  OrganizationUnit: string;
  Locality: string;
  CommonName: string;
  StateOrProvince: string;
  EMailAddress: string;
}

export enum EvoTypes{
  Undefined = -1,
  DatiProfiloDocumento = 0,
  UsoInterno = 1,
  DocumentPlaceholder = 2,
  AttachmentPlaceholder = 3,
  NotesPlaceholder = 4,
  List = 5,
  Command = 6,
}

export enum EvoDataTypes{
  Undefined = -1,
  Stringa = 0,
  Numero = 1,
  Datetime = 2,
  Boolean = 3,
  Colore = 4,
  Immagine = 5,
  Decimal = 6,
  Date = 7,
  Note = 8,   //da qui boh! sono per maschera modifica
  Computed = 9,
  Counter= 10,
  Xml = 11,
  Sequence = 12,
  Multiselection = 13,
  ColoreConTesto = 14
}

export enum EvoInputTypes{
  Undefined = -1,
  Inputbox = 0,
  Textarea = 1,
  List = 5
}

export enum EvoInputShowmode{
  Hidden = 0,
  Readonly = 1,
  Required = 2,
  Default = 3
}

export enum EvoInputValueMode
{
  Default = 0,
  Constant = 1,
  Ignore = 2,
  Parameter = 3,
  CustomCode = 4,
  Formula = 5,
  Empty = 6,
  UserStorage = 7,
  CopyValue = 8,
  KeepValue = 9,
  FileParameter = 10
}

export enum EvoFormCloseMode
{
  Save = 0,               //SALVA
  CloseAfterSave = 1,         //NON USATO
  CloseAfterCancel = 2,       //NON USATO
  SaveAndClose = 3,            //SALVA E CHIUDI
  SaveAndCloseSave = 4  //SALVA E CHIUDI + SALVA
}

export enum EvoListType{
  SimpleValueList = 27,
  ExternalValueList = 29,
  StateValueList = 39,
  ViewLookup = 31
}

