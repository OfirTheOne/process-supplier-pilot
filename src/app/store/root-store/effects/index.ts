import { ProcessStandardEffect } from './process-standard.effect';
import { ApprovedSuppliersEffect } from './approved-suppliers.effect';



export const effects: any[] = [
    ProcessStandardEffect,
    ApprovedSuppliersEffect
];

export * from './process-standard.effect';
export * from './approved-suppliers.effect';

