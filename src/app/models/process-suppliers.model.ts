export interface ProcessSuppliers {
    processName: string;
    suppliers: {supplierName: string, supplierNumber: string}[]; // Set<{supplierName: string, supplierNumber: string}>;
}

export interface ApprovedSuppliers {
    paramsAsString: string;
    params: {[key: string]: string};
    suppliers: {supplierName: string, supplierNumber: string}[];
}
