import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class CocktailDbService {

    /**
     * The Cocktail API: https://www.thecocktaildb.com/
     */
    private baseApiUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/';

    constructor(private http: HttpClient){}

    getIngredients() {
        let url = this.baseApiUrl + 'list.php?i=list';
        return this.http.get(url);
    }

    getIngredientByName(name: string) {
        let url = this.baseApiUrl + `search.php?i=${name}`;
        return this.http.get(url);
    }


}