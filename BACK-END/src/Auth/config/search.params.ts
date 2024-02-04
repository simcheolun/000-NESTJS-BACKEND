export interface searchParams {
  objSearchMapper: {
    seq: number,                  // 항목아이디
    searchKeyword: string | null; // 검색어
    cache:true;

    userId:number;

    // getCarsStructure
    vin:string;
    brand:string;
    mcid:string;
    num: number;
  };
  page: number;
  size: number;
}