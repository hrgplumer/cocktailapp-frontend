import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppAssets } from './app.assets';

@Injectable()
export class CocktailDbService {

    /**
     * The Cocktail API: https://www.thecocktaildb.com/
     */
    readonly apiUrl;

    constructor(private http: HttpClient){
        this.apiUrl = AppAssets.BASE_API_URL + AppAssets.API_KEY + '/';
    }

    getIngredients() {
        let url = this.apiUrl + 'list.php?i=list';
        return this.http.get(url);
    }

    getIngredientByName(name: string) {
        let url = this.apiUrl + `search.php?i=${name}`;
        return this.http.get(url);
    }


}