import { Injectable } from '@angular/core';


const jsonDat = {
  "Schema": {
    "ViewId": "MTg2Ng==",
    "VolumeId": "MTUzNw==",
    "Name": "ORDCLI",
    "Title": "Ordini cliente",
    "TitleTemplate": "{Iderp}",
    "PageSize": 100,
    "ShowAllRecord": true,
    "ShowAllRelations": false,
    "EnableDoubleClickOpenCommandID": false,
    "DoubleClickOpenCommandID": null,
    "EnableFullTextSearch": false,
    "AddCommands": [],
    "AttachView": true,
    "AttachManagement": true,
    "HistoryView": false,
    "Columns": [
      {
        "ColId": 1005,
        "Name": "DOC",
        "Title": "PDF",
        "Type": 2,
        "DataType": 5,
        "FormatMask": "",
        "Width": 0,
        "HAlign": 0,
        "Attributes": 1,
        "HideOnCard": false,
        "DocColumnName": "DOC",
        "DocId": 5,
        "DocCategory": "PDF",
        "DocumentType": "",
        "Sendable": true,
        "Printable": true,
        "Exportable": true,
        "Importable": false,
        "Openable": true,
        "Deletable": false,
        "SearchEnabled": true,
        "EnableFullText": false
      },
      {
        "ColId": 1006,
        "Name": "PR",
        "Title": "Proposal",
        "Type": 2,
        "DataType": 5,
        "FormatMask": "",
        "Width": 0,
        "HAlign": 0,
        "Attributes": 1,
        "HideOnCard": false,
        "DocColumnName": "PR",
        "DocId": 6,
        "DocCategory": "PDF",
        "DocumentType": "",
        "Sendable": true,
        "Printable": true,
        "Exportable": true,
        "Importable": false,
        "Openable": true,
        "Deletable": false,
        "SearchEnabled": true,
        "EnableFullText": false
      },
      {
        "ColId": 2001,
        "Name": "_Attach",
        "Title": "Allegati",
        "Type": 3,
        "DataType": 5,
        "FormatMask": "",
        "Width": 0,
        "HAlign": 0,
        "Attributes": 1,
        "HideOnCard": false,
        "SearchEnabled": true
      },
      {
        "ColId": 38,
        "Name": "Stato",
        "Title": "Stato",
        "Type": 5,
        "DataType": 4,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": "MTQz"
      },
      {
        "ColId": 4,
        "Name": "Num_Ordine",
        "Title": "Numero",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 5,
        "Name": "Data_Doc",
        "Title": "Data",
        "Type": 0,
        "DataType": 7,
        "FormatMask": "",
        "Width": 0,
        "HAlign": 1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 11,
        "Name": "Cod_cli",
        "Title": "Cod. Cli",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 12,
        "Name": "Rag_Soc",
        "Title": "Ragione Sociale",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 15,
        "Name": "Partita_Iva",
        "Title": "Partita IVA",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 16,
        "Name": "Cod_Fisc",
        "Title": "Cod. Fisc.",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 61,
        "Name": "Utente",
        "Title": "Utente",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 33,
        "Name": "DsCreationUsername",
        "Title": "Utente creaz.",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": -1,
        "HAlign": -1,
        "Attributes": 2,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 34,
        "Name": "DsCreationDate",
        "Title": "Data creaz.",
        "Type": 0,
        "DataType": 7,
        "FormatMask": "",
        "Width": -1,
        "HAlign": -1,
        "Attributes": 2,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 35,
        "Name": "DsLastModifiedUsername",
        "Title": "Utente mod.",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": -1,
        "HAlign": -1,
        "Attributes": 2,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 36,
        "Name": "DsLastModifiedDate",
        "Title": "Data mod.",
        "Type": 0,
        "DataType": 7,
        "FormatMask": "",
        "Width": -1,
        "HAlign": -1,
        "Attributes": 2,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 47,
        "Name": "Iderp",
        "Title": "Iderp",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": -1,
        "HAlign": -1,
        "Attributes": 2,
        "HideOnCard": false,
        "SearchEnabled": false,
        "MultiSelection": false,
        "ListId": ""
      },
      {
        "ColId": 1,
        "Name": "P_IVA_Soc",
        "Title": "Cod.ditta",
        "Type": 5,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": "MjMyNw=="
      },
      {
        "ColId": 67,
        "Name": "Programma",
        "Title": "Programma",
        "Type": 0,
        "DataType": 0,
        "FormatMask": "",
        "Width": 0,
        "HAlign": -1,
        "Attributes": 0,
        "HideOnCard": false,
        "SearchEnabled": true,
        "MultiSelection": false,
        "ListId": ""
      }
    ],
    "Commands": [],
    "Relations": [
      {
        "ViewId": "NDU5Mw==",
        "VolumeId": "NDU4OQ==",
        "Key": "View_4593_0",
        "ViewTitle": "Revisioni",
        "Columns": [
          "Iderp"
        ]
      },
      {
        "ViewId": "MTU2MA==",
        "VolumeId": "NDYw",
        "Key": "View_1560_0",
        "ViewTitle": "Collegamenti con conferma ordine",
        "Columns": [
          "Iderp"
        ]
      },
      {
        "ViewId": "Nzc4Mg==",
        "VolumeId": "Nzc3Nw==",
        "Key": "View_7782_0",
        "ViewTitle": "Documenti collegati",
        "Columns": [
          "Iderp"
        ]
      }
    ]
  }
}

@Injectable({
  providedIn: 'root'
})
export class StrutturaService {

  constructor() { }

  estraiStruttura(){
    return jsonDat;
  }

}
