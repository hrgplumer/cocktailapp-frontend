import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';


import { SearchComponent } from './search.component';
import { IngredientComponent } from './ingredient.component';
import { CocktailDbService } from './cocktaildb.service';
import { IngredientService } from './ingredient.service';
import { CocktailComponent } from './cocktail.component';
import { CocktailListComponent } from './cocktail-list.component';
import { CocktailDetailComponent } from './cocktail-detail.component';
import { HomeComponent } from './home.component';

const routes = [
  { path: 'cocktail/:cocktailId', component: CocktailDetailComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    IngredientComponent,
    CocktailComponent,
    CocktailListComponent,
    CocktailDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
    MatExpansionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ CocktailDbService, IngredientService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
