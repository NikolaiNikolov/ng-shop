import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent],
    imports: [ CommonModule, routing, ReactiveFormsModule, FormsModule ],
    exports: [],
    providers: [],
})
export class LoginModule {}