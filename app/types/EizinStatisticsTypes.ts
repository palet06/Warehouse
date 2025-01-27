export interface EizinStatisticsResponseTypeUyruk {
  ULKE: string;
  SAYI: number;
}

export interface EizinStatisticsResponseTypeMeslek {
  IL: string;
  SAYI: number;
}

export interface EizinStatisticsResponseTypeIl {
  ADI: string;
  KODU: string;
  SAYI: number;
}


export const enum EizinStatisticsResponseTypeModel {
  Uyruk=1,
  Meslek=2,
  Il=3
}

export interface Sonuc {
  [EizinStatisticsResponseTypeModel.Uyruk]:EizinStatisticsResponseTypeUyruk;
  [EizinStatisticsResponseTypeModel.Meslek]:EizinStatisticsResponseTypeMeslek;
  [EizinStatisticsResponseTypeModel.Il]:EizinStatisticsResponseTypeIl;
}