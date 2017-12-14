import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details.component';

const routes: Routes = [
  { path: '', component: PostDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);