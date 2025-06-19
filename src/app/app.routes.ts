import { Routes } from '@angular/router';
import { CardListComponent } from './pages/card-list/card-list.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export const routes: Routes = [
  { path:'', component: CardListComponent },
  { path: 'detalhes/:name', component:DetalhesComponent }
];
