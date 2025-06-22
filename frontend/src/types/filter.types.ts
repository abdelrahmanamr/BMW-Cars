export interface Filter {
  field: string;
  operator: string;
  value: string;
}

export interface FilterPayload {
  filters: Filter[];
}
