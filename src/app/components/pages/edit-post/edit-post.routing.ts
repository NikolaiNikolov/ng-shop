import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPostComponent } from './edit-post.component';

const routes: Routes = [
  { path: '', component: EditPostComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);