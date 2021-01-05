import { CompanyRequest } from './../models/company.request';
import { APINotificationResult, APISignature, Progress, Source, Status } from '../models/api.model';
import { CompanyResponse } from '../models/company.response';
import { Observable, Observer, of } from 'rxjs';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, delay, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { CountryMapper, StateMapper } from '../models/mapping.model';
import { UserRequest } from '../models/user.request';
import { UserResponse } from '../models/user.response';
import { UserAccountRequest } from '../models/user-account.request';
import { UserAccountResponse } from '../models/user-account.response';
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
                console.log(source);
                console.log(data);
                this.notification.notify.next(new APINotificationResult(source,
                                 new Status(true,false,notificationMessage?notificationMessage:'OK',Progress.Completed),data));
            }                  
            return data;
        }));
    }

    createCompany(payload : CompanyRequest){
        console.log('create company');
        console.log(payload);
        this.notification.notify.next(new APINotificationResult(Source.CompanyCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<CompanyResponse>((obs :Observer<CompanyResponse>)=>{
            var data : CompanyResponse = {
                "companyId": 2020,
                "companyName": "Cloud7Works",
                "addressLine1": "123 Main Street",
                "addressLine2": "South Riding",
                "city": "Chantilly",
                "state": "VA",
                "zipCode": "20152",
                "country": "United States",
                "naicsCode": "54654",
                "dunsNumber": "5645646"
                };
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.CompanyCreation);
    }
    
    updateCompany(companyId: any, payload?: CompanyRequest): Observable<CompanyResponse> {
        this.notification.notify.next(new APINotificationResult(Source.CompanyUpdate, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<CompanyResponse>((obs :Observer<CompanyResponse>)=>{
            var data : CompanyResponse = {
                "companyId": 7,
                "companyName": "Cloud7Works",
                "addressLine1": "123 Main Street",
                "addressLine2": "South Riding",
                "city": "Chantilly",
                "state": "VA",
                "zipCode": "20152",
                "country": "United States",
                "naicsCode": "54654",
                "dunsNumber": "5645646"
                };
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.CompanyUpdate);
    }
    
    company(companyId: number): Observable<CompanyResponse>{
        this.notification.notify.next(new APINotificationResult(Source.Company, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<CompanyResponse>((obs :Observer<CompanyResponse>)=>{
            var data : CompanyResponse = {
                "companyId": 7,
                "companyName": "Cloud7Works",
                "addressLine1": "123 Main Street",
                "addressLine2": "South Riding",
                "city": "Chantilly",
                "state": "VA",
                "zipCode": "20152",
                "country": "United States",
                "naicsCode": "54654",
                "dunsNumber": "5645646"
                };
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.Company);
    }

    createUser(companyId: number, payload: UserRequest): Observable<UserResponse> {
        console.log('create user');
        console.log(payload);
        this.notification.notify.next(new APINotificationResult(Source.UserCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<UserResponse>((obs :Observer<UserResponse>)=>{
            var data : UserResponse ={
                "userId": 100,
                "companyId":companyId,
                "firstName": "Ronald",
                "lastName": "Jose",
                "title": "Developer",
                "phoneNumber": "123456",
                "email": "domain@account.com"
              }
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.UserCreation);
    }

    user(companyId: number, userId: number): Observable<UserResponse> {
        this.notification.notify.next(new APINotificationResult(Source.User, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<UserResponse>((obs :Observer<UserResponse>)=>{
            var data : UserResponse ={
                "userId": 100,
                "companyId":companyId,
                "firstName": "Ronald",
                "lastName": "Jose",
                "title": "Developer",
                "phoneNumber": "123456",
                "email": "domain@account.com"
              }
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.User);
    }

    updateUser(companyId: number, userId: number, payload: UserRequest): Observable<UserResponse> {
        this.notification.notify.next(new APINotificationResult(Source.UserUpdate, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<UserResponse>((obs :Observer<UserResponse>)=>{
            var data : UserResponse ={
                "userId": 100,
                "companyId":companyId,
                "firstName": "Ronald",
                "lastName": "Jose",
                "title": "Developer",
                "phoneNumber": "123456",
                "email": "domain@account.com"
              }
          obs.next(data);
        }).pipe(delay(0));
        return this.result(Source.UserUpdate);
    }

    createUserAccount(userId: number, payload: UserAccountRequest): Observable<UserAccountResponse> {
        console.log('create user account');
        console.log(payload);
        this.notification.notify.next(new APINotificationResult(Source.UserAccountCreation, new Status(false,false,'',Progress.Completed),null));
        this.api = new Observable<UserAccountResponse>((obs :Observer<UserAccountResponse>)=>{
            var data : UserAccountResponse ={
                "userAccountId": 200,
                "userName": "TEST"
              }
          obs.next(data);
        }).pipe(delay(0));
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