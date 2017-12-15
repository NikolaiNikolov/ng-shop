import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { CommentService } from '../../../core/services/comment/comment.service';
import { takeUntil } from 'rxjs/operators'; // for rxjs ^5.5.0 lettable operators
import { PostViewModel } from '../../../core/models/view-models/post-view.model';
import { CommentViewModel } from '../../../core/models/view-models/comment-view.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  posts : PostViewModel[];
  comments : CommentViewModel[];
  userId = localStorage.getItem('userId');
  username = localStorage.getItem('username');

  constructor(
    private postService : PostService,
    private commentService : CommentService,
    private router : Router,
    private toastr : ToastsManager
  ) { }

  ngOnInit() {
    this.postService.getUserPosts(this.userId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(posts => this.posts = posts);
    
    this.commentService.getUserComments(this.userId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(comments => this.comments = comments);
  }

  deletePost(id) {
    this.postService.deletePost(id)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(p =>{
      this.posts = this.posts.filter(post => {
        return post.postId !== id;
      })
      this.toastr.success("Post successfully deleted!", "Success");
      this.router.navigate(['/profile'])
    }) 
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }
}
