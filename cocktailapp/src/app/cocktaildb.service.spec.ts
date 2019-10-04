import { createHTTPFactory, SpectatorHTTP } from '@netbasal/spectator/jest';
import { HTTPMethod } from '@netbasal/spectator';

import { CocktailDbService } from './cocktaildb.service';

describe('Service: CocktailDbService', () => {
    const httpService: () => SpectatorHTTP<CocktailDbService> =
        createHTTPFactory<CocktailDbService>(CocktailDbService);

    const baseApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  
    it('exists', () => {
      const { dataService } = httpService();
      expect(dataService).toBeDefined();
    });
  
    it('can get ingredients from the server', () => {
      const { dataService, expectOne } = httpService();
  
      dataService.getIngredients().subscribe();
      expectOne(baseApiUrl + 'list.php?i=list', HTTPMethod.GET);
    });

    it ('can get vodka', () => {
        const { dataService, expectOne } = httpService();
        const ing = 'vodka';

        dataService.getIngredientByName(ing).subscribe();
        expectOne(baseApiUrl + `search.php?i=${ing}`, HTTPMethod.GET);
    });

    it ('can get lemonade', () => {
        const { dataService, expectOne } = httpService();
        const ing = 'lemonade';

        dataService.getIngredientByName(ing).subscribe();
        expectOne(baseApiUrl + `search.php?i=${ing}`, HTTPMethod.GET);
    });

  });