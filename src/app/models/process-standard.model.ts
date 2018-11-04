export interface ProcessStandard {
    supplierName: string;
    standardName: string;
    processName: string;
    elop: boolean;
    comments: string;
    supplierNumber: string;  /* supplierId */
    NADCAP: boolean;
    AS9100: boolean;
    aircraft: boolean;
    land: boolean;
    drone: boolean;
    elisra: boolean;
    kinetics: boolean;
    _id: string;
}
