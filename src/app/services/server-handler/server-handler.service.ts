import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment.prod';
import { HttpService } from './../http/http.service';
import { ProcessStandard } from './../../models/process-standard.model';
import { ProcessSuppliers, ApprovedSuppliers } from './../../models/process-suppliers.model';
import { HttpParams } from '@angular/common/http';

@Injectable()

export class ServerHandlerService {
    private baseUrl: string;

    constructor(private http: HttpService) {
        this.baseUrl = environment.db_url;
    }


    public getAllProcessStandardData(): Observable<ProcessStandard[]> {
        console.log('getAllProcessStandardData()');
        const questUrl = this.baseUrl + 'approved-processes/';
        return this.http.get<{ data: ProcessStandard[] }>(questUrl).pipe(
            map(body => {
                console.log(body);
                return body.data;
            })
        );
    }


    public getProcessSuppliers(processName: string): Observable<ProcessSuppliers> {
        console.log('getAllProcessStandardData()');
        const questUrl = this.baseUrl + `process-suppliers/${processName}`;
        // const params = new HttpParams({ fromObject: { p: processName } });
        return this.http.get<{ data: { supplierName: string, supplierNumber: string }[] }>(questUrl).pipe(
            map(body => {
                console.log(body);
                const suppliers = body.data;
                // new Set<{supplierName: string, supplierNumber: string}>(body.data);
                return { processName, suppliers } as ProcessSuppliers;
            })
        );
    }

    public getApprovedSuppliers(byParams: { processName?: string, standardName?: string }): Observable<ApprovedSuppliers> {
        console.log('getApprovedSuppliers()', byParams);
        const questUrl = this.baseUrl + `approved-processes/suppliers/`;
         const params: HttpParams = this.createHttpParamsFromPartialObject(byParams);

        return this.http.get<{ data: { supplierName: string, supplierNumber: string }[] }>(
            questUrl, undefined, params)
            .pipe(
                map(body => {
                    console.log(body);
                    const suppliers = body.data;
                    // new Set<{supplierName: string, supplierNumber: string}>(body.data);
                    return { paramsAsString: params.toString(), params: byParams, suppliers } as ApprovedSuppliers;
                })
            );
    }

    createHttpParamsFromPartialObject(obj: {[key: string]: string}): HttpParams {
        return Object.keys(obj)
            .reduce((params, key) => obj[key] ? params.set(key, obj[key]) : params , new HttpParams());
    }
}
