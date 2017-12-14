import { Component, OnInit, Input, Output } from '@angular/core';
import { CommentViewModel } from '../../../core/models/view-models/comment-view.model';
import { CommentService } from '../../../core/services/comment/comment.service';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment : CommentViewModel;
  @Output() public commentIsDeleted : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private commentService : CommentService,
    private authService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  deleteComment(id) {
    this.commentService.deleteComment(id)
    .subscribe(r => {
      this.commentIsDeleted.emit(this.comment.commentId);
    })
  }
}
