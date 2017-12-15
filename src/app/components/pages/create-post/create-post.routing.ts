import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post.component';
import { EditPostComponent } from '../edit-post/edit-post.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreatePostComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);