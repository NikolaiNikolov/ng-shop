import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { PostViewModel } from '../../../core/models/view-models/post-view.model';
import { SummaryPipe } from '../../../core/pipes/summary/summary.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts : PostViewModel[];
  p: number = 1;
  
  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getAllPosts()
    .subscribe(data => {
      this.posts = data;
    });
    
  }

}
