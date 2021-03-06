import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details.component';
import { EditPostComponent } from '../edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: PostDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);