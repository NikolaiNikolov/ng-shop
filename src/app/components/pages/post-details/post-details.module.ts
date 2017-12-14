import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './post-details.routing';
import { PostDetailsComponent } from './post-details.component';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { CommentComponent } from '../../shared/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [PostDetailsComponent, CommentFormComponent, CommentComponent],
    imports: [ CommonModule, routing, ReactiveFormsModule, FormsModule, NgxPaginationModule ],
    exports: [],
    providers: [],
})
export class PostDetailsModule {}