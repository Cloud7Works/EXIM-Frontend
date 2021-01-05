import { UserAccountResponse } from './user-account.response';
import { UserResponse } from './user.response';
import { UserRequest } from './user.request';
import { State } from './state.model';
import { Observable } from 'rxjs';
import { CompanyRequest } from './company.request';
import { CompanyResponse } from './company.response';
import { Country } from './country.model';
import { UserAccountRequest } from './user-account.request';
export enum Source{
    CompanyCreation = 'Company Creation',
    CompanyUpdate = 'Company Update',
    Company = 'Get Compnay',
    UserCreation = 'User Creation',
    User = 'Get User',
    UserUpdate = 'User Update',
    UserAccountCreation = 'User Account Creation',    
    Coutries = "Countries",
    States = "States"
}
export enum Progress{
    Idle=0,
    InProgress=1,
    Completed =2
}

export class Status{
    constructor(public isCompleted: boolean,public isError: boolean, public message: any,public progress:Progress){
        this.isCompleted=isCompleted;
        this.isError=isError;
        this.message=message;
        this.progress = progress;
    }
}

export class APINotificationResult{
    constructor(public source : Source, public status : Status, public result :any){
        this.source = source;
        this.status = status;
        this.result = result;
    }
}

export interface APISignature{
    countries() : Observable<Country[]>;
    states(): Observable<State[]>;
    createCompany(payload : CompanyRequest) : Observable<CompanyResponse>;
    company(companyId: number) : Observable<CompanyResponse>;
    updateCompany(companyId: number, payload : CompanyRequest) : Observable<CompanyResponse>;
    createUser(companyId: number, payload: UserRequest) : Observable<UserResponse>;
    user(companyId: number, userId: number) : Observable<UserResponse>;
    updateUser(companyId: number, userId: number, payload: UserRequest): Observable<UserResponse>;
    createUserAccount(userId : number,payload: UserAccountRequest): Observable<UserAccountResponse>;
    // updateCompany
}