import { Component, OnInit, Input } from '@angular/core';
import { PostViewModel } from '../../../core/models/view-models/post-view.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post : PostViewModel;

  constructor() { }

  ngOnInit() {
    
  }

}
