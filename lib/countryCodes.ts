"use server";
const ulkeKodlari = [
  ["AFGANİSTAN İSLAM CUMHURİYETİ", "AFG"],
  ["ALMANYA FEDERAL CUMHURİYETİ", "DEU"],
  ["AMERİKA BİRLEŞİK DEVLETLERİ (ABD)", "USA"],
  ["ANDORRA PRENSLİĞİ", "AND"],
  ["ANGOLA CUMHURİYETİ", "AGO"],
  ["ANTİGUA VE BARBUDA", "ATG"],
  ["ARJANTİN CUMHURİYETİ", "ARG"],
  ["ARNAVUTLUK CUMHURİYETİ", "ALB"],
  ["AVUSTRALYA", "AUS"],
  ["AVUSTURYA CUMHURİYETİ", "AUT"],
  ["AZERBAYCAN CUMHURİYETİ", "AZE"],
  ["BAHAMALAR", "BHS"],
  ["BAHREYN KRALLIĞI", "BHR"],
  ["BANGLADEŞ HALK CUMHURİYETİ", "BGD"],
  ["BARBADOS", "BRB"],
  ["BELARUS CUMHURİYETİ (1)", "BLR"],
  ["BELÇİKA KRALLIĞI", "BEL"],
  ["BELİZE", "BLZ"],
  ["BENİN CUMHURİYETİ", "BEN"],
  ["BİRLEŞİK ARAP EMİRLİKLERİ", "ARE"],
  ["BİRLEŞİK MEKSİKA DEVLETLERİ", "MEX"],
  ["BOLİVARCI VENEZUELA CUMHURİYETİ", "VEN"],
  ["BOLİVYA ÇOK ULUSLU DEVLETİ", "BOL"],
  ["BOSNA HERSEK", "BIH"],
  ["BOTSVANA CUMHURİYETİ", "BWA"],
  ["BREZİLYA FEDERATİF CUMHURİYETİ", "BRA"],
  ["BRUNEY DARÜSSELAM", "BRN"],
  ["BULGARİSTAN CUMHURİYETİ", "BGR"],
  ["BURKİNA FASO", "BFA"],
  ["BURUNDİ CUMHURİYETİ", "BDI"],
  ["BUTAN KRALLIĞI", "BTN"],
  ["BUYUK BRİTANYA VE KUZEY İRLANDA", "GBR"],
  ["BİRLEŞİK KRALLIĞI", "GBR"],
  ["CABO VERDE CUMHURİYETİ (3)", "CPV"],
  ["CEZAYİR DEMOKRATİK HALK", "DZA"],
  ["CİBUTİ CUMHURİYETİ", "DJI"],
  ["ÇAD CUMHURİYETİ", "TCD"],
  ["ÇEK CUMHURİYETİ", "CZE"],
  ["ÇİN HALK CUMHURİYETİ", "CHN"],
  ["DANİMARKA KRALLIĞI", "DNK"],
  ["DOĞU TİMOR DEMOKRATİK", "TLS"],
  ["DOMİNİK CUMHURİYETİ", "DOM"],
  ["DOMİNİKA", "DMA"],
  ["EKVATOR CUMHURİYETİ", "ECU"],
  ["EKVATOR GİNESİ CUMHURİYETİ", "GNQ"],
  ["EL SALVADOR CUMHURİYETİ", "SLV"],
  ["ENDONEZYA CUMHURİYETİ", "IDN"],
  ["ERİTRE DEVLETİ", "ERI"],
  ["ERMENİSTAN CUMHURİYETİ", "ARM"],
  ["ESTONYA CUMHURİYETİ", "EST"],
  ["ESVATİNİ KRALLIĞI (4)", "SWZ"],
  ["ETİYOPYA FEDERAL DEMOKRATİK", "ETH"],
  ["FAS KRALLIĞI", "MAR"],
  ["FİJİ CUMHURİYETİ", "FJI"],
  ["FİLİPİNLER CUMHURİYETİ", "PHL"],
  ["FİLİSTİN DEVLETİ (5)", "PSE"],
  ["FİNLANDİYA CUMHURİYETİ", "FIN"],
  ["FRANSA CUMHURİYETİ", "FRA"],
  ["GABON CUMHURİYETİ", "GAB"],
  ["GAMBİYA CUMHURİYETİ", "GMB"],
  ["GANA CUMHURİYETİ", "GHA"],
  ["GİNE CUMHURİYETİ", "GIN"],
  ["GİNE-BİSSAU CUMHURİYETİ", "GNB"],
  ["GRENADA", "GRD"],
  ["GUATEMALA CUMHURİYETİ", "GTM"],
  ["GUYANA KOOPERATİF CUMHURİYETİ", "GUY"],
  ["GÜNEY AFRİKA CUMHURİYETİ", "ZAF"],
  ["GÜNEY SUDAN CUMHURİYETİ", "SSD"],
  ["GÜRCİSTAN", "GEO"],
  ["HAİTİ CUMHURİYETİ", "HTI"],
  ["HIRVATİSTAN CUMHURİYETİ", "HRV"],
  ["HİNDİSTAN CUMHURİYETİ", "IND"],
  ["HOLLANDA KRALLIĞI", "NLD"],
  ["HONDURAS CUMHURİYETİ", "HND"],
  ["IRAK CUMHURİYETİ", "IRQ"],
  ["İRAN İSLAM CUMHURİYETİ", "IRN"],
  ["İRLANDA", "IRL"],
  ["İSPANYA KRALLIĞI", "ESP"],
  ["İSRAİL DEVLETİ", "ISR"],
  ["İSVEÇ KRALLIĞI", "SWE"],
  ["İSVİÇRE KONFEDERASYONU", "CHE"],
  ["İTALYA CUMHURİYETİ", "ITA"],
  ["İZLANDA", "ISL"],
  ["JAMAİKA", "JAM"],
  ["JAPONYA", "JPN"],
  ["KAMBOÇYA KRALLIĞI", "KHM"],
  ["KAMERUN CUMHURİYETİ", "CMR"],
  ["KANADA", "CAN"],
  ["KARADAĞ", "MNE"],
  ["KATAR DEVLETİ", "QAT"],
  ["KAZAKİSTAN CUMHURİYETİ", "KAZ"],
  ["KENYA CUMHURİYETİ", "KEN"],
  ["KIRGIZİSTAN", "KGZ"],
  ["KİRİBATİ CUMHURİYETİ", "KIR"],
  ["KOLOMBİYA CUMHURİYETİ", "COL"],
  ["KOMORLAR BİRLİĞİ", "COM"],
  ["KONGO CUMHURİYETİ", "COG"],
  ["KONGO DEMOKRATİK CUMHURİYETİ", "COD"],
  ["KORE CUMHURİYETİ", "KOR"],
  ["KORE DEMOKRATİK HALK", "PRK"],
  ["KOSOVA CUMHURİYETİ", "KSV"],
  ["KOSTA RİKA CUMHURİYETİ", "CRI"],
  ["KOTDİVUAR CUMHURİYETİ (6)", "CIV"],
  ["KUVEYT DEVLETİ", "KWT"],
  ["KUZEY KIBRIS TURK CUMHURİYETİ", "CTR"],
  ["KÜBA CUMHURİYETİ", "CUB"],
  ["LAOS DEMOKRATİK HALK", "LAO"],
  ["LESOTHO KRALLIĞI", "LSO"],
  ["LETONYA CUMHURİYETİ", "LVA"],
  ["LİBERYA CUMHURİYETİ", "LBR"],
  ["LİBYA DEVLETİ", "LBY"],
  ["LİHTENŞTAYN PRENSLİĞİ", "LIE"],
  ["LİTVANYA CUMHURİYETİ", "LTU"],
  ["LÜBNAN CUMHURİYETİ", "LBN"],
  ["LÜKSEMBURG BÜYÜK DÜKALIĞI", "LUX"],
  ["MACARİSTAN", "HUN"],
  ["MADAGASKAR CUMHURİYETİ", "MDG"],
  ["KUZEY MAKEDONYA CUMHURİYETİ (7)", "MKD"],
  ["MALAVİ CUMHURİYETİ", "MWI"],
  ["MALDİVLER CUMHURİYETİ", "MDV"],
  ["MALEZYA", "MYS"],
  ["MALİ CUMHURİYETİ", "MLI"],
  ["MALTA CUMHURİYETİ", "MLT"],
  ["MARŞAL ADALARI CUMHURİYETİ", "MHL"],
  ["MISIR ARAP CUMHURİYETİ", "EGY"],
  ["MİKRONEZYA FEDERE DEVLETLERİ", "FSM"],
  ["MOĞOLİSTAN", "MNG"],
  ["MOLDOVA CUMHURİYETİ", "MDA"],
  ["MONAKO PRENSLİĞİ", "MCO"],
  ["MORİTANYA İSLAM CUMHURİYETİ", "MRT"],
  ["MORİTYUS CUMHURİYETİ", "MUS"],
  ["MOZAMBİK CUMHURİYETİ", "MOZ"],
  ["MYANMAR BİRLİĞİ CUMHURİYETİ", "MMR"],
  ["NAMİBYA CUMHURİYETİ", "NAM"],
  ["NAURU CUMHURİYETİ", "NRU"],
  ["NEPAL FEDERAL DEMOKRATİK", "NPL"],
  ["NİJER CUMHURİYETİ", "NER"],
  ["NİJERYA FEDERAL CUMHURİYETİ", "NGA"],
  ["NİKARAGUA CUMHURİYETİ", "NIC"],
  ["NORVEÇ KRALLIĞI", "NOR"],
  ["ORTA AFRİKA CUMHURİYETİ", "CAF"],
  ["ÖZBEKİSTAN CUMHURİYETİ", "UZB"],
  ["PAKİSTAN İSLAM CUMHURİYETİ", "PAK"],
  ["PALAU CUMHURİYETİ", "PLW"],
  ["PANAMA CUMHURİYETİ", "PAN"],
  ["PAPUA YENİ GİNE BAĞIMSIZ DEVLETİ", "PNG"],
  ["PARAGUAY CUMHURİYETİ", "PRY"],
  ["PERU CUMHURİYETİ", "PER"],
  ["POLONYA CUMHURİYETİ", "POL"],
  ["PORTEKİZ CUMHURİYETİ", "PRT"],
  ["ROMANYA", "ROU"],
  ["RUANDA CUMHURİYETİ", "RWA"],
  ["RUSYA FEDERASYONU", "RUS"],
  ["SAİNT KİTTS VE NEVİS FEDERASYONU", "KNA"],
  ["SAİNT LUCİA", "LCA"],
  ["SAİNT VİNCENT VE GRENADİNLER", "VCT"],
  ["SAMOA BAĞIMSIZ DEVLETİ", "WSM"],
  ["SAN MARİNO CUMHURİYETİ", "SMR"],
  ["SAO TOME VE PRİNSİPE DEMOKRATİK", "STP"],
  ["SENEGAL CUMHURİYETİ", "SEN"],
  ["SEYŞELLER CUMHURİYETİ", "SYC"],
  ["SIRBİSTAN CUMHURİYETİ", "SRB"],
  ["SİERRA LEONE CUMHURİYETİ", "SLE"],
  ["SİNGAPUR CUMHURİYETİ", "SGP"],
  ["SLOVAK CUMHURİYETİ", "SVK"],
  ["SLOVENYA CUMHURİYETİ", "SVN"],
  ["SOLOMON ADALARI", "SLB"],
  ["SOMALİ FEDERAL CUMHURİYETİ", "SOM"],
  ["SRİ LANKA DEMOKRATİK SOSYALİST", "LKA"],
  ["SUDAN CUMHURİYETİ", "SDN"],
  ["SURİNAM CUMHURİYETİ", "SUR"],
  ["SURİYE ARAP CUMHURİYETİ", "SYR"],
  ["SUUDİ ARABİSTAN KRALLIĞI", "SAU"],
  ["ŞİLİ CUMHURİYETİ", "CHL"],
  ["TACİKİSTAN CUMHURİYETİ", "TJK"],
  ["TANZANYA BİRLEŞİK CUMHURİYETİ", "TZA"],
  ["TAYLAND KRALLIĞI", "THA"],
  ["TOGO CUMHURİYETİ", "TGO"],
  ["TONGA KRALLIĞI", "TON"],
  ["TRİNİDAD VE TOBAGO CUMHURİYETİ", "TTO"],
  ["TUNUS CUMHURİYETİ", "TUN"],
  ["TUVALU", "TUV"],
  ["TÜRKİYE CUMHURİYETİ", "TUR"],
  ["TÜRKMENİSTAN", "TKM"],
  ["UGANDA CUMHURİYETİ", "UGA"],
  ["UKRAYNA", "UKR"],
  ["UMMAN SULTANLIĞI", "OMN"],
  ["URUGUAY DOĞU CUMHURİYETİ", "URY"],
  ["ÜRDÜN HAŞİMİ KRALLIĞI", "JOR"],
  ["VANUATU CUMHURİYETİ", "VUT"],
  ["VATİKAN", "VAT"],
  ["VİETNAM SOSYALİST CUMHURİYETİ", "VNM"],
  ["YEMEN CUMHURİYETİ", "YEM"],
  ["YENİ ZELANDA", "NZL"],
  ["YUNANİSTAN CUMHURİYETİ", "GRC"],
  ["ZAMBİYA CUMHURİYETİ", "ZMB"],
  ["ZİMBABVE CUMHURİYETİ", "ZWE"],
];

export const toLowerCaseTurkish = async (str: string) => {
  const charMap = {
    I: "ı",
    İ: "i",
    Ü: "ü",
    U: "u",
    Ş: "ş",
    Ç: "ç",
    Ğ: "ğ",
    Ö: "ö",
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
    G: "g",
    H: "h",
    J: "j",
    K: "k",
    L: "l",
    M: "m",
    N: "n",
    O: "o",
    P: "p",
    Q: "q",
    R: "r",
    S: "s",
    T: "t",
    V: "v",
    W: "w",
    X: "x",
    Y: "y",
    Z: "z",
  };

  return str.replace(
    /[A-ZİIÜŞÇĞÖ]/g,
    (char: string) => charMap[char as keyof typeof charMap] || char
  );
};

export async function ulkeKodunuAl(
  anahtarKelime: string | undefined | null
): Promise<string | null> {
  const ulkeObj = ulkeKodlari.map(async ([ulke, kod]) => [
    await toLowerCaseTurkish(ulke),
    kod,
  ]);

  const kod = await Promise.all(
    ulkeObj.map(async (satir) => {
      const [ulkeAdi, ulkeKodu] = await satir;

      if (ulkeAdi.includes(anahtarKelime!.toLowerCase())) {
        return ulkeKodu;
      }
      return null;
    })
  );

  const result = kod.find((k) => k !== null) || null;

  return result;
}
