export interface searchParams {
    objSearchMapper: {
        seq:number,
        state: number;
        searchType: string;
        searchKeyword: string | null;
        payStatus:number;
        customerId:number;
        cache: boolean| false;
};
      page: number;
      size: number;
}