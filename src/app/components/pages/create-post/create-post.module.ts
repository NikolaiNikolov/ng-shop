import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './create-post.routing';
import { CreatePostComponent } from './create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms'

@NgModule({
    declarations: [
        CreatePostComponent
    ],
    imports: [ 
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule
        ],
    exports: [],
    providers: [],
})
export class CreatePostModule {}