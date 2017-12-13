import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostInputModel } from '../../../core/models/input-models/post-input.model';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm;
  errors = {};

  constructor(
    private fb: FormBuilder,
    private postService : PostService,
    private route : Router
  ) { }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      title: "",
      content: "",
      image: "",
      category: ""
    })
  }

  createPost() {
    const { title, content, image, category } =  this.createPostForm.value;
    let inputModel = new PostInputModel(title, content, category, image);
    this.postService.createPost(inputModel)
    .subscribe(r => {
      this.postCreatedSuccess(r);
    })
  }

  postCreatedSuccess(r) {
    this.route.navigate(['/home'])
  }
}
