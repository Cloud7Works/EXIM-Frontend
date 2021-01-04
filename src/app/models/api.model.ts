import { Observable } from 'rxjs';
import { CompanyRequest } from './company.request';
import { CompanyResponse } from './company.response';
export enum Source{
    CompanyCreation = 'Company Creation',
    UserCreation = 'User Creation'
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
    createCompany(payload : CompanyRequest) : Observable<CompanyResponse>;
    // updateCompany
}