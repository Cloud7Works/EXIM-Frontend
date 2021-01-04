import { APINotificationResult, APISignature, Progress, Source, Status } from '../models/api.model';
import { CompanyResponse } from '../models/company.response';
import { Observable, Observer, of } from 'rxjs';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CompanyRequest } from '../models/company.request';
import { NotificationService } from './notification.service';

export class APIStaticService implements APISignature{
    constructor(private http : HttpClient,private notification : NotificationService){                
    }
    

    api : Observable<any> = of(null);
    httpOptions = {headers: new HttpHeaders({'content-type':'application/json'})};

    private result(source: Source, mapper? : any, notificationMessage? : {type:'CRUD',operation:any}){
        return this.api.pipe(
        catchError(()=> of(new Status(true,true,{type : 'CRUD', operation:'Something went wrong'},Progress.Completed))),
        map((response : any)=>{ 
            var data: any;           
            data = mapper && !(response instanceof Status)? mapper.map(response) : response;
            if(response instanceof Status){
                this.notification.notify.next(new APINotificationResult(source,data,null));
            }else{
                this.notification.notify.next(new APINotificationResult(source,
                                 new Status(true,false,notificationMessage?notificationMessage:'OK',Progress.Completed),data));
            }                  
            return data;
        }));
    }

    createCompany(payload : CompanyRequest){
        this.api = new Observable<CompanyResponse>((obs :Observer<CompanyResponse>)=>{
            var data : CompanyResponse = { "companyId": 123,
            "companyName": "string",
            "addressLine1": "string",
            "addressLine2": "string",
            "city": "string",
            "state": "string",
            "zipCode": "string",
            "country": "string",
            "naicsCode": "string",
            "dunsNumber": "string"
          }          
          obs.next(data);
        });
        return this.result(Source.CompanyCreation);
    }
}