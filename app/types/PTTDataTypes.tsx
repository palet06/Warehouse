export interface PTTResponseType {
    alici: string | null;
    barno: string | null;
    degkonucr: string | null;
    ekhiz: string | null;
    gonderen: string | null;
    gonucr: string | null;
    gr: string | null;
    imerk: string | null;
    itarih: string | null;
    odsarucr: string | null;
    tesalan: string | null;
    vmerk: string | null;
    dongu: Array<{
        imerk: string | null;
        islem: string | null;
        itarih: string | null;
        siraNo: number | null;
    }> | null;
    sonucAciklama: string | null;
    sonucKodu: number | null;
    message: string | null;
    description: string | null;
    fieldErrors: null;
}

