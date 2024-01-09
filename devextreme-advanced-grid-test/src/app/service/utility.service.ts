import { Injectable } from '@angular/core';
import {EvoDataTypes} from '../model/griglia.model';
import {formatDate} from 'devextreme/localization';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    ProcessGridStructByType(gridStructure: any[],viewId: string): Promise<any[]>{
        return new Promise<any[]>((resolve)=>{
            for (let objStruct of gridStructure) {
                let index = gridStructure.indexOf(objStruct);
                gridStructure[index].ViewId = viewId;
                switch (objStruct.DataType) {
                    case EvoDataTypes.Stringa: {
                        //tipologia stringa
                        gridStructure[index].GridDataType = 'string';
                        break;
                    }
                    case EvoDataTypes.Numero:{
                        gridStructure[index].GridDataType = 'number';
                        break;
                    }
                    case EvoDataTypes.Decimal: {
                        //tipologia numero
                        gridStructure[index].GridDataType = 'number';
                        let numberOfPrecision = 2;
                        if(gridStructure[index].FormatMask != "" && gridStructure[index].FormatMask != null){
                            let split = gridStructure[index].FormatMask.split(".");
                            if(split.length > 1){
                                numberOfPrecision = split[1].length;
                            }else{
                                numberOfPrecision = 0;
                            }
                        }
                        gridStructure[index].FormatMaskAdv = {
                            type: 'fixedPoint',
                            precision: numberOfPrecision
                        }
                        break;
                    }
                    case EvoDataTypes.Datetime:
                    case EvoDataTypes.Date: {
                        //tipologia data
                        if(objStruct.DataType == EvoDataTypes.Date){
                            gridStructure[index].GridDataType = 'date';
                            if (objStruct.FormatMask == '') {
                                gridStructure[index].FormatMask = 'dd/MM/yyyy';
                            }
                        }else{
                            gridStructure[index].GridDataType = 'date';
                            if (objStruct.FormatMask == '') {
                                gridStructure[index].FormatMask = 'dd/MM/yyyy HH:mm:ss';
                            }
                        }

                        let appoFormat = gridStructure[index].FormatMask;
                        gridStructure[index].FormatMaskAdv = {
                            parser: function (value) {
                                if (value == null) {
                                    return '';
                                }
                                let parts = value.split('/');
                                if (3 !== parts.length) {
                                    return;
                                }
                                return new Date(parts[2].length < 3 ? Number('20' + parts[2]) : Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
                            },
                            formatter: function (value) {
                                // return formatter.format(value, appoFormat);
                                return formatDate(value, appoFormat);
                            }
                        };
                        break;
                    }
                    case EvoDataTypes.Boolean: {
                        //tipologia boolean
                        gridStructure[index].GridDataType = 'boolean';
                        break;
                    }
                    case EvoDataTypes.Colore: {
                        //tipologia colore
                        if (gridStructure[index].Width != -1) {
                            gridStructure[index].Width = 36;
                        }
                        break;
                    }
                    case EvoDataTypes.Immagine: {
                        //tipologia immagine
                        if (gridStructure[index].Width != -1) {
                            gridStructure[index].Width = 36;
                        }
                        break;
                    }
                }
            }
            resolve(gridStructure);
        })
    }
}
