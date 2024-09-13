  //
  export interface DataTablesResponse {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: any[]; // You can replace `any` with a more specific type based on your data
  }
