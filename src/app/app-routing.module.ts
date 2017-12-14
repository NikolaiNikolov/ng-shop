import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/error/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { PostDetailsComponent } from './components/pages/post-details/post-details.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'post/:id', canActivate: [ AuthGuard ], loadChildren: 'app/components/pages/post-details/post-details.module#PostDetailsModule' },
  { path: 'create', canActivate: [ AuthGuard ], loadChildren: 'app/components/pages/create-post/create-post.module#CreatePostModule' },
  { path: 'home', canActivate: [ AuthGuard ], loadChildren: 'app/components/pages/home/home.module#HomeModule' },
  { path: 'login', loadChildren: 'app/components/pages/auth/login/login.module#LoginModule' },
  { path: 'register', loadChildren: 'app/components/pages/auth/register/register.module#RegisterModule' },  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],  
})
export class AppRoutingModule { }
