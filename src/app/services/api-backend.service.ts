import { APINotificationResult, APISignature, Progress, Source, Status } from './../models/api.model';
import { CompanyResponse } from './../models/company.response';
import { Observable, Observer, of } from 'rxjs';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CompanyRequest } from '../models/company.request';
import { NotificationService } from './notification.service';
import { UserAccountRequest } from '../models/user-account.request';
import { UserAccountResponse } from '../models/user-account.response';
import { UserRequest } from '../models/user.request';
import { UserResponse } from '../models/user.response';
import { ConfigurationService } from './configuration.service';
import { CountryMapper, StateMapper } from '../models/mapping.model';

@Injectable()
export class APIBackendService implements APISignature{
    constructor(private http : HttpClient,private notification : NotificationService, private configData : ConfigurationService){                
    }

    private  config = this.configData.config;

    api : Observable<any> = of(null);
    httpOptions = {headers: new HttpHeaders({'content-type':'application/json','accept':'application/json'})};

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
        this.notification.notify.next(new APINotificationResult(Source.CompanyCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = this.http.post(this.config.host + this.config.endPoints.company.POST,payload,this.httpOptions);
        return this.result(Source.CompanyCreation);
    }

    updateCompany(companyId: number, payload: CompanyRequest): Observable<CompanyResponse> {
        throw new Error('Method not implemented.');
    }
    
    company(companyId: number): Observable<CompanyResponse> {
        throw new Error('Method not implemented.');
    }

    createUser(companyId: number, payload: UserRequest): Observable<UserResponse> {
        this.notification.notify.next(new APINotificationResult(Source.UserCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = this.http.post(this.config.host + this.config.endPoints.user.POST.replace('REPLACE_VALUE',companyId.toString()),payload,this.httpOptions);
        return this.result(Source.UserCreation);
    }

    user(companyId: number, userId: number): Observable<UserResponse> {
        throw new Error('Method not implemented.');
    }
    
    updateUser(companyId: number, userId: number, payload: UserRequest): Observable<UserResponse> {
        throw new Error('Method not implemented.');
    }

    createUserAccount(userId: number, payload: UserAccountRequest): Observable<UserAccountResponse> {
        this.notification.notify.next(new APINotificationResult(Source.UserCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = this.http.post(this.config.host + this.config.endPoints.userAccount.POST.replace('REPLACE_VALUE',userId.toString()),payload,this.httpOptions);
        return this.result(Source.UserAccountCreation);
    }

    countries(){
        this.notification.notify.next(new APINotificationResult(Source.Coutries,  new Status(false,false,'',Progress.Completed),[]));
        this.api = this.http.get('./assets/data/countries.json');        
        return this.result(Source.Coutries,new CountryMapper());
    }

    states(){
        this.notification.notify.next(new APINotificationResult(Source.States,  new Status(false,false,'',Progress.Completed),[]));
        this.api = this.http.get('./assets/data/states.json');
        return this.result(Source.States, new StateMapper());
    }
}