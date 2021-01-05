import { Country, CountryResponse } from "./country.model";
import { State, StateResponse } from "./state.model";

export class CountryMapper{
    map(response : CountryResponse[]) : Country[]{
       return response.map(c=>{
            let country : Country = {
                code:c.code,
                name:c.name,
                selected:false
            };  
            return country;          
        });
    }
}

export class StateMapper{
    map(response : StateResponse[]) : State[]{
       return response.map(c=>{
            let state : State = {
                name:c.name,
                abbreviation:c.abbreviation,
                selected:false
            };  
            return state;          
        });
    }
}
