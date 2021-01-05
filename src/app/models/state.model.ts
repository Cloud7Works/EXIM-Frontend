export interface State extends StateResponse{
    selected:boolean
}

export interface StateResponse{
    name: string;
    abbreviation:string;
}