import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { routing } from './register.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegisterComponent],
    imports: [ CommonModule, routing, ReactiveFormsModule, FormsModule ],
    exports: [],
    providers: [],
})
export class RegisterModule {}