import { Component, OnInit, OnDestroy, Output, EventEmitter, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { PostViewModel } from '../../../core/models/view-models/post-view.model';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { UserViewModel } from '../../../core/models/view-models/user-view.model';
import { takeUntil } from 'rxjs/operators'; // for rxjs ^5.5.0 lettable operators
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { CommentService } from '../../../core/services/comment/comment.service';
import { CommentViewModel } from '../../../core/models/view-models/comment-view.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  private post : PostViewModel;
  private author : UserViewModel;
  private ngUnsubscribe = new Subject();
  private isAuthor : boolean = false;
  comments;
  @Output() public commentAdded:EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private route : ActivatedRoute,
    private postService : PostService,
    private authService : AuthenticationService,
    private router : Router,
    private commentService : CommentService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    let postObserver = this.postService.getPost(id);

    postObserver
    .takeUntil(this.ngUnsubscribe)
    .subscribe(post => {
      this.post = post
    });

    postObserver
    .takeUntil(this.ngUnsubscribe)
    .subscribe(post => {
      this.authService.getUser(post.author)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(a => {
        this.author = a;
        this.isAuthor = this.authService.isAuthor(post);
      });
    })
    
    postObserver
    .takeUntil(this.ngUnsubscribe)
    .subscribe(post => {
      this.commentService.getComments(post.id)
      .subscribe(c => {
        this.comments = c;
      })
    });
  }

  deletePost(id) {
    this.postService.deletePost(id)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(c =>{
      this.router.navigate(['/home'])
    }) 
  }

  commentRecieved(recievedComment) {
    this.comments.push(recievedComment);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

}
