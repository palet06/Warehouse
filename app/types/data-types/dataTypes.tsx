import { format } from "date-fns";
import { ColDef, IDateFilterParams } from "ag-grid-community";
import { Check, X } from "lucide-react";

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;

    let dateParts;
    let cellDate;
    if (dateAsString.includes("T")) {
      const tempPart = dateAsString.split("T");

      dateParts = tempPart[0].split("-");

      cellDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
    } else {
      dateParts = dateAsString.split("-");
      cellDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
    }

    const formattedFilterDate = format(filterLocalDateAtMidnight, "dd.MM.yyyy");
    const formattedCellDate = format(cellDate, "dd.MM.yyyy");

    if (formattedFilterDate === formattedCellDate) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

export interface ContentItem {
  basvuruNo?: number | null;
  yabanciKimlikNumarasi?: string | null;
  izinAktifMi?: boolean | null;
  izinDurumu?: string | null;
  basvuruTuru?: string | null;
  basvuruTipi?: string | null;
  calismaIzniTuru?: string | null;
  adi?: string | null;
  soyadi?: string | null;
  izinVerilenIl?: string | null;
  basvuruTarihi?: string | null;
  basvuruKararTarihi?: string | null;
  onayVerilenBaslangicTarihi?: string | null;
  onayVerilenBitisTarihi?: string | null;
  aktiflesmeTarihi?: string | null;
  onayTebligTarihi?: string | null;
  iptalSonlandirmaTarihi?: string | null;
  iptalSonlandirmaGerekcesi?: string | null;
  sonDegisiklikZamani?: string | null;
  olusturulmaZamani?: string | null;
  reddeItirazKararTarihi?: string | null;
  reddeItirazTarihi?: string | null;
  uzatmaBasvurusununYapildigiBasvuruNo?: number | null;
  talepEdilenIzinBaslangicTarihi?: string | null;
  talepEdilenIzinBitisTarihi?: string | null;
  retAciklamasi?: string | null;
  serhler?: string | null;
  islemAciklamasi?: string | null;
  islemTipi?: string | null;
  islemTarihi?: string | null;
  aylikBrutUcret?: number | null;
  paraBirimi?: string | null;
  meslekTanim?: string | null;
  meslekIskurKodu?: string | null;
  isvereniVarMi?: boolean | null;
  isyeriSgkTescilNumarasi?: string | null;
  isyeriIl?: string | null;
  isyeriIlce?: string | null;
  isyeriIlceKodu?: number | null;
  isyeriMeskenId?: number | null;
  isyeriAdresi?: string | null;
  isyeriUnvan?: string | null;
  isyeriNaceKodu?: string | null;
  isyeriSermayeYapisi?: string | null;
  isyeriFirmaTipi?: string | null;
  isyeriVergiNumarasi?: string | null;
  calisacagiIl?: string | null;
  calisacagiIlKodu?: number | null;
  calisacagiIlce?: string | null;
  calisacagiIlceKodu?: number | null;
  calisacagiMeskenId?: string | null;
  calisacagiAdres?: string | null;
  babaAdi?: string | null;
  anaAdi?: string | null;
  cinsiyeti?: string | null;
  dogumYeri?: string | null;
  dogumYeriKodu?: number | null;
  dogumTarihi?: string | null;
  medeniHali?: string | null;
  ikametIlKodu?: number | null;
  ikametIl?: string | null;
  ikametVerilisAmaci?: string | null;
  uyruk?: string | null;
  uyrukKodu?: number | null;
  uyrukDiger?: string | null;
  esininAdi?: string | null;
  esininSoyadi?: string | null;
  esTckn?: string | null;
  geciciKorumaStatusu?: string | null;
  esUyruk?: string | null;
  esUyrukKodu?: number | null;
  eposta?: string | null;
  eposta2?: string | null;
  telefon?: string | null;
  telefon2?: string | null;
  telefonKodu?: string | null;
  telefon2Kodu?: string | null;
  adres?: string | null;
  disIsleriReferansNumarasi?: string | null;
  pasaportNumarasi?: string | null;
  pasaportSonGecerlilikTarihi?: string | null;
  passportType?: string | null;
  anadil?: string | null;
  bilinenDiller?: string | null;
  turkceSeviyesi?: string | null;
  egitimSeviyesi?: string | null;
  liseOkul?: string | null;
  universiteOkul?: string | null;
  universiteBolum?: string | null;
  universiteBaslangicTarihi?: string | null;
  universiteMezuniyetTarihi?: string | null;
  yuksekogretimOkul?: string | null;
  yuksekogretimBolum?: string | null;
  yuksekogretimBaslangicTarihi?: string | null;
  yuksekogretimMezuniyetTarihi?: string | null;
}

export interface DataContent {
  content: ContentItem[];
}

export interface ApiResponseType {
  success: boolean;
  message: string;
  data: DataContent;
}

export interface ApiRequestType {
  pageSize: number;
  pageNumber: number;
  allHistories: boolean;
  izinAktifMi: boolean | null;
  referansNo: string | null;
  yabanciKimlikNo: string | null;
  inBasvuruNoList: string[] | null;
  ad: string | null;
  soyad: string | null;
  anaAdi: string | null;
  babaAdi: string | null;
  pasaportNo: string | null;
  dogumTarihi: string | null;
  isyeriSgkTescilNumarasi: string | null;
  isyeriUnvani: string | null;
  notInBasvuruNoList: string[] | null;
  inUyrukIdList: string[] | null;
  notInUyrukIdList: string[] | null;
  inBasvuruTipiList: string[] | null;
  notInBasvuruTipiList: string[] | null;
  inBasvuruTuruList: string[] | null;
  notInBasvuruTuruList: string[] | null;
  inCalismaIzniTuruList: string[] | null;
  notInCalismaIzniTuruList: string[] | null;
  inCinsiyetList: string[] | null;
  notInCinsiyetList: string[] | null;
  inEgitimDurumuList: string[] | null;
  notInEgitimDurumuList: string[] | null;
  inFirmaTipiList: string[] | null;
  notInFirmaTipiList: string[] | null;
  inGeciciKorumaStatusuList: string[] | null;
  notInGeciciKorumaStatusuList: string[] | null;
  inIslemTipiList: string[] | null;
  notInIslemTipiList: string[] | null;
  izinDurumuList: string[] | null;
  notInIzinDurumuList: string[] | null;
  inMedeniHalList: string[] | null;
  notInMedeniHalList: string[] | null;
  inPasaportTuruList: string[] | null;
  notInPasaportTuruList: string[] | null;
  inSermayeYapisiList: string[] | null;
  notInSermayeYapisiList: string[] | null;
  inTurkceSeviyesiList: string[] | null;
  notInTurkceSeviyesiList: string[] | null;
}

export const WareHouseColDefs: ColDef<ContentItem>[] = [
  {
    headerName: "Başvuru No",
    field: "basvuruNo",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Yabancı Kimlik Numarası",
    field: "yabanciKimlikNumarasi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İzin Aktif Mi",
    field: "izinAktifMi",
    useValueFormatterForExport: true,
    filter: "agTextColumnFilter",
    cellRenderer: (cell) =>
      cell.value === true ? (
        <div className="flex items-center justify-center py-2">
          <Check className=" text-green-500" />
        </div>
      ) : cell.value === false ? (
        <div className="flex items-center justify-center py-2">
          <X className=" text-red-500" />
        </div>
      ) : (
        ""
      ),
  },
  {
    headerName: "İzin Durumu",
    field: "izinDurumu",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Başvuru Türü",
    field: "basvuruTuru",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Başvuru Tipi",
    field: "basvuruTipi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Çalışma İzni Türü",
    field: "calismaIzniTuru",
    filter: "agTextColumnFilter",
  },
  { headerName: "Adı", field: "adi", filter: "agTextColumnFilter" },
  { headerName: "Soyadı", field: "soyadi", filter: "agTextColumnFilter" },
  {
    headerName: "İzin Verilen İl",
    field: "izinVerilenIl",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Başvuru Tarihi",
    field: "basvuruTarihi",
    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",

    filter: "agDateColumnFilter",
    filterParams: filterParams,

    //   { comparator: function(filterLocalDate, cellValue) {
    //     filterLocalDate = new Date(format(filterLocalDate,"dd.MM.yyyy"));
    //     const cellDate = new Date(cellValue.slice(0,-1));
    //     const filterBy = filterLocalDate.getTime();
    //     const filterMe = cellDate.getTime();
    //     if (filterBy === filterMe) {
    //       return 0;
    //     }

    //     if (filterMe < filterBy) {
    //       return -1;
    //     }

    //     if (filterMe > filterBy) {
    //       return 1;
    //     }
    //   },
    // }

    // valueFormatter: (params: { value?: string }) =>
    //   params.value ? format(params.value, "dd.MM.yyyy") : "",
  },

  {
    headerName: "Başvuru Karar Tarihi",
    field: "basvuruKararTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Onay Verilen Başlangıç Tarihi",
    field: "onayVerilenBaslangicTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Onay Verilen Bitiş Tarihi",
    field: "onayVerilenBitisTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Aktifleşme Tarihi",
    field: "aktiflesmeTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Onay Teblig Tarihi",
    field: "onayTebligTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "İptal Sonlandırma Tarihi",
    field: "iptalSonlandirmaTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "İptal Sonlandırma Gerekçesi",
    field: "iptalSonlandirmaGerekcesi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Son Değişiklik Zamanı",
    field: "sonDegisiklikZamani",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Oluşturulma Zamanı",
    field: "olusturulmaZamani",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Redde İtiraz Karar Tarihi",
    field: "reddeItirazKararTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Redde İtiraz Tarihi",
    field: "reddeItirazTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Uzatma Başvurusunun Yapıldığı Başvuru No",
    field: "uzatmaBasvurusununYapildigiBasvuruNo",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Talep Edilen İzin Başlangıç Tarihi",
    field: "talepEdilenIzinBaslangicTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Talep Edilen İzin Bitiş Tarihi",
    field: "talepEdilenIzinBitisTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Ret Açıklaması",
    field: "retAciklamasi",
    filter: "agTextColumnFilter",
  },
  { headerName: "Şerhler", field: "serhler", filter: "agTextColumnFilter" },
  {
    headerName: "İşlem Açıklaması",
    field: "islemAciklamasi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşlem Tipi",
    field: "islemTipi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşlem Tarihi",
    field: "islemTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Aylık Brüt Ücret",
    field: "aylikBrutUcret",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Para Birimi",
    field: "paraBirimi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Meslek Tanım",
    field: "meslekTanim",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Meslek İŞKUR Kodu",
    field: "meslekIskurKodu",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşvereni Var Mı",
    field: "isvereniVarMi",
    filter: "agTextColumnFilter",
    cellRenderer: (cell) =>
      cell.value === true ? (
        <div className="flex items-center justify-center py-2">
          <Check className=" text-green-500" />
        </div>
      ) : cell.value === false ? (
        <div className="flex items-center justify-center py-2">
          <X className=" text-red-500" />
        </div>
      ) : (
        ""
      ),
  },
  {
    headerName: "İşyeri SGK Tescil Numarası",
    field: "isyeriSgkTescilNumarasi",
    filter: "agTextColumnFilter",
  },
  { headerName: "İşyeri İl", field: "isyeriIl", filter: "agTextColumnFilter" },
  {
    headerName: "İşyeri İlçe",
    field: "isyeriIlce",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri İlçe Kodu",
    field: "isyeriIlceKodu",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "İşyeri Mesken ID",
    field: "isyeriMeskenId",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "İşyeri Adresi",
    field: "isyeriAdresi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri Unvan",
    field: "isyeriUnvan",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri NACE Kodu",
    field: "isyeriNaceKodu",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri Sermaye Yapısı",
    field: "isyeriSermayeYapisi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri Firma Tipi",
    field: "isyeriFirmaTipi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İşyeri Vergi Numarası",
    field: "isyeriVergiNumarasi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Çalışacağı İl",
    field: "calisacagiIl",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Çalışacağı İl Kodu",
    field: "calisacagiIlKodu",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Çalışacağı İlçe",
    field: "calisacagiIlce",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Çalışacağı İlçe Kodu",
    field: "calisacagiIlceKodu",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Çalışacağı Mesken ID",
    field: "calisacagiMeskenId",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Çalışacağı Adres",
    field: "calisacagiAdres",
    filter: "agTextColumnFilter",
  },
  { headerName: "Baba Adı", field: "babaAdi", filter: "agTextColumnFilter" },
  { headerName: "Ana Adı", field: "anaAdi", filter: "agTextColumnFilter" },
  { headerName: "Cinsiyeti", field: "cinsiyeti", filter: "agTextColumnFilter" },
  {
    headerName: "Doğum Yeri",
    field: "dogumYeri",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Doğum Yeri Kodu",
    field: "dogumYeriKodu",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Doğum Tarihi",
    field: "dogumTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Medeni Hali",
    field: "medeniHali",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "İkamet İl Kodu",
    field: "ikametIlKodu",
    filter: "agNumberColumnFilter",
  },
  { headerName: "İkamet İl", field: "ikametIl", filter: "agTextColumnFilter" },
  {
    headerName: "İkamet Veriliş Amacı",
    field: "ikametVerilisAmaci",
    filter: "agTextColumnFilter",
  },
  { headerName: "Uyruk", field: "uyruk", filter: "agTextColumnFilter" },
  {
    headerName: "Uyruk Kodu",
    field: "uyrukKodu",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Uyruk Diğer",
    field: "uyrukDiger",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Eşinin Adı",
    field: "esininAdi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Eşinin Soyadı",
    field: "esininSoyadi",
    filter: "agTextColumnFilter",
  },
  { headerName: "Eş TCKN", field: "esTckn", filter: "agTextColumnFilter" },
  {
    headerName: "Geçici Koruma Statüsü",
    field: "geciciKorumaStatusu",
    filter: "agTextColumnFilter",
  },
  { headerName: "Eş Uyruk", field: "esUyruk", filter: "agTextColumnFilter" },
  {
    headerName: "Eş Uyruk Kodu",
    field: "esUyrukKodu",
    filter: "agNumberColumnFilter",
  },
  { headerName: "E-posta", field: "eposta", filter: "agTextColumnFilter" },
  { headerName: "E-posta 2", field: "eposta2", filter: "agTextColumnFilter" },
  { headerName: "Telefon", field: "telefon", filter: "agTextColumnFilter" },
  { headerName: "Telefon 2", field: "telefon2", filter: "agTextColumnFilter" },
  {
    headerName: "Telefon Kodu",
    field: "telefonKodu",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Telefon 2 Kodu",
    field: "telefon2Kodu",
    filter: "agTextColumnFilter",
  },
  { headerName: "Adres", field: "adres", filter: "agTextColumnFilter" },
  {
    headerName: "Dış İşleri Referans Numarası",
    field: "disIsleriReferansNumarasi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Pasaport Numarası",
    field: "pasaportNumarasi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Pasaport Son Geçerlilik Tarihi",
    field: "pasaportSonGecerlilikTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Pasaport Türü",
    field: "passportType",
    filter: "agTextColumnFilter",
  },
  { headerName: "Ana Dil", field: "anadil", filter: "agTextColumnFilter" },
  {
    headerName: "Bilinen Diller",
    field: "bilinenDiller",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Türkçe Seviyesi",
    field: "turkceSeviyesi",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Eğitim Seviyesi",
    field: "egitimSeviyesi",
    filter: "agTextColumnFilter",
  },
  { headerName: "Lise Okul", field: "liseOkul", filter: "agTextColumnFilter" },
  {
    headerName: "Üniversite Okul",
    field: "universiteOkul",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Üniversite Bölüm",
    field: "universiteBolum",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Üniversite Başlangıç Tarihi",
    field: "universiteBaslangicTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Üniversite Mezuniyet Tarihi",
    field: "universiteMezuniyetTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Yükseköğretim Okul",
    field: "yuksekogretimOkul",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Yükseköğretim Bölüm",
    field: "yuksekogretimBolum",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Yükseköğretim Başlangıç Tarihi",
    field: "yuksekogretimBaslangicTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
  {
    headerName: "Yükseköğretim Mezuniyet Tarihi",
    field: "yuksekogretimMezuniyetTarihi",
    filter: "agDateColumnFilter",
    filterParams: filterParams,

    valueFormatter: (params: { value?: string }) =>
      params.value ? format(params.value, "dd.MM.yyyy") : "",
  },
];
