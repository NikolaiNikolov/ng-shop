import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post.component';

const routes: Routes = [
  { path: '', component: CreatePostComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);