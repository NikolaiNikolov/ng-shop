import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentInputModel } from '../../../core/models/input-models/comment-input.model';
import { Subject } from 'rxjs/Subject';
import { CommentService } from '../../../core/services/comment/comment.service';
import { CommentViewModel } from '../../../core/models/view-models/comment-view.model';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentModel : CommentInputModel;
  @Input() postId;
  @Output() public commentAdded:EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private commentService : CommentService
  ) { }

  ngOnInit() {
    this.commentModel = new CommentInputModel("", "");
  }

  submitComment() {
    this.commentModel.setPostId = this.postId;
    this.commentService.postComment(this.commentModel)
    .subscribe(newComment => {
      this.commentAdded.emit(new CommentViewModel(newComment._id, newComment.author, newComment.postId, newComment.content, newComment._kmd.lmt));
      this.commentModel = new CommentInputModel("", "");
    })
  }
}
