import { Spectator, createTestComponentFactory } from '@netbasal/spectator/jest';
import { IngredientComponent } from './ingredient.component';

describe('Component: Ingredient Component', () => {
    let spectator: Spectator<IngredientComponent>;
    const component = createTestComponentFactory<IngredientComponent>({
        component: IngredientComponent
    });

    it ('test component should be defined', () => {
        spectator = component();
        expect(spectator).toBeTruthy();
    })

    // beforeEach(() => {
    //     spectator = component();
    // });

    // it('exists', () => {
    //     spectator = component();
    //     expect(spectator.component).toBeDefined();
    // });

    // it('renders an ingredient with default name if no input is given', () => {
    //     spectator = component();
    //     expect(spectator.query('p.ingredient-name')).toHaveText('New Ingredient');
    // });

    // it('renders an ingredient the name given through the input param', () => {
    //     spectator = component();
    //     spectator.component.ingredientName = 'Applejack';
    //     spectator.detectChanges();
    //     expect(spectator.query('p.ingredient-name')).toHaveText('Applejack');
    // });

    // it('emits message on delete', () => {
    //     spectator = component();
    //     const deleteEmit = spyOn(spectator.component.deleted, 'emit');
    //     spectator.component.ingredientName = 'Applejack';
    //     spectator.detectChanges();
    //     spectator.component.delete();
    //     expect(deleteEmit).toHaveBeenCalledWith('Applejack');
    // });
});