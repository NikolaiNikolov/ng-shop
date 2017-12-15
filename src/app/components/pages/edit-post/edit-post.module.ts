import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './edit-post.routing';
import { EditPostComponent } from './edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';

@NgModule({
    declarations: [EditPostComponent],
    imports: [ CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule ],
    exports: [],
    providers: [],
})
export class EditPostModule {}