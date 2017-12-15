import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesViewModel } from '../../../core/models/view-models/categories-view.model';
import { PostViewModel } from '../../../core/models/view-models/post-view.model';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPostForm;
  errors = [];
  categories : CategoriesViewModel[];
  model : PostViewModel = new PostViewModel("","","","","",new Date(),"");
  postId : string;
  
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router : Router,
    private toastr : ToastsManager
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];

    this.postService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });

    this.postService.getPost(this.postId)
    .subscribe(post => {
      this.model = post;
    })

  }

  editPost() {
    this.postService.editPost(this.postId, this.model)
    .subscribe(r => {
      this.toastr.success("Post edited successfully!", "Success!");
      this.router.navigate(['/post/'+this.postId]);
    })
  }
}
