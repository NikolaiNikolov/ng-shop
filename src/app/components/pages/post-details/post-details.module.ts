import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './post-details.routing';
import { PostDetailsComponent } from './post-details.component';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { CommentComponent } from '../../shared/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [PostDetailsComponent, CommentFormComponent, CommentComponent],
    imports: [ CommonModule, routing, ReactiveFormsModule, FormsModule ],
    exports: [],
    providers: [],
})
export class PostDetailsModule {}