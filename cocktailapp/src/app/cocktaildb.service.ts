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

    /**
     * Get the full list of ingredients from the Cocktail API.
     */
    getIngredients() {
        let url = this.apiUrl + 'list.php?i=list';
        return this.http.get(url);
    }

    /**
     * Search the list of cocktail ingredients by name.
     * @param name The ingredient name to search for
     */
    getIngredientByName(name: string) {
        let url = this.apiUrl + `search.php?i=${name}`;
        return this.http.get(url);
    }

    /**
     * Search for cocktails that contain all of the ingredients in the input list.
     * @param list The list of ingredients to search: a comma delimited string
     */
    getCocktailsByIngredientsList(list: string) {
        return this.http.get(this.apiUrl + `filter.php?i=${list}`);
    }

    /**
     * Search for a cocktail by its id.
     * @param id The id of the cocktail to lookup.
     */
    getCocktailById(id: string) {
        return this.http.get(this.apiUrl + `lookup.php?i=${id}`);
    }
}