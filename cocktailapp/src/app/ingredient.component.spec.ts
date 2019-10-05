import { Spectator, createTestComponentFactory } from '@netbasal/spectator/jest';
import { IngredientComponent } from './ingredient.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Ingredient } from './ingredient.interface';

describe('Component: Ingredient Component', () => {
    let spectator: Spectator<IngredientComponent>;
    const component = createTestComponentFactory<IngredientComponent>({
        component: IngredientComponent,
        schemas: [NO_ERRORS_SCHEMA]
    });

    beforeEach(() => {
        spectator = component();
        spectator.setInput('ingredient', <Ingredient>{
            id: '1',
            name: 'Vodka',
            description: 'Vodka is a Russian spirit.',
            type: 'A',
            abv: '40'
        });
    });

    it ('test component should be defined', () => {
        expect(spectator).toBeTruthy();
    });

    it('exists', () => {
        expect(spectator.component).toBeDefined();
    });

    // it('renders an ingredient with default name if no input is given', () => {
    //     expect(spectator.query('p.ingredient-name')).toHaveText('New Ingredient');
    // });

    it('renders an ingredient the name given through the input param', () => {
        expect(spectator.query('p.ingredient-name')).toHaveText('Vodka');
    });

    // it('emits message on delete', () => {
    //     spectator = component();
    //     const deleteEmit = spyOn(spectator.component.deleted, 'emit');
    //     spectator.component.ingredientName = 'Applejack';
    //     spectator.detectChanges();
    //     spectator.component.delete();
    //     expect(deleteEmit).toHaveBeenCalledWith('Applejack');
    // });
});