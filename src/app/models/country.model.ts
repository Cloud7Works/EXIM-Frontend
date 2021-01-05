export interface Country extends CountryResponse{    
    selected:boolean;
}

export interface CountryResponse{
    name: string;
    code: string;        
}