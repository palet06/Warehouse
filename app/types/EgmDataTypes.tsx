export interface EgmDataTypes {
    success:boolean;
    message:string;
    data:EgmDataItem;
    errorDetails:EgmErrorDetails | null;
}

export interface EgmDataItem {
    turkiyedeMi:boolean;
    kesinKarar:boolean;
    ulkeyeSonGirisTarihi: string | null;
    ulkedenSonCikisTarihi: string | null;
    girisTarihleriList: string[] | null;
    cikisTarihleriList:string[] | null;
}

interface EgmErrorDetails {
    exceptionStackTrace:string | null;
    errorType:string|null;
}