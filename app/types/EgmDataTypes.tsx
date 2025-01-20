export interface EgmDataTypes {
    aciklama:string;
    body:EgmBodyType[] | null
    kod:number;
}

interface EgmBodyType {
    ad:string;
    soyad:string;
    girisCikis:string;
    tarih:string;
}