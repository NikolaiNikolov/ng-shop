import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostInputModel } from '../../../core/models/input-models/post-input.model';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';
import { CategoriesViewModel } from '../../../core/models/view-models/categories-view.model';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm;
  errors = {};
  categories: CategoriesViewModel[];
  p : number = 1;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: Router
  ) { }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      image: ["", [Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
      category: ["", [Validators.required]]
    });

    this.postService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories;
      });

    const titleControl = this.createPostForm.get('title');
    titleControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(titleControl, "title"));

    const contentControl = this.createPostForm.get('content');
    contentControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(contentControl, "content"));

    const imageControl = this.createPostForm.get('image');
    imageControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(imageControl, "image"));

    const categoryControl = this.createPostForm.get('category');
    categoryControl
      .valueChanges
      .debounceTime(1000)
      .subscribe(v => this.setMessage(categoryControl, "category"));
  }

  createPost() {
    const { title, content, image, category } = this.createPostForm.value;
    let inputModel = new PostInputModel(title, content, category, image);
    this.postService.createPost(inputModel)
      .subscribe(r => {
        this.postCreatedSuccess(r);
      })
  }

  postCreatedSuccess(r) {
    this.route.navigate(['/home'])
  }

  setMessage(c: AbstractControl, inputField) {
    this.errors[inputField] = "";

    if ((c.touched || c.dirty) && c.errors) {
      const errorType = Object.keys(c.errors)[0];
      let message = "";
      console.log(errorType)
      
      switch (errorType) {
        case "required":
          message = `${this.capitalize(inputField)} is required`;
          break;
        case "minlength":
          message = `${this.capitalize(inputField)} can't be shorter than ${c.errors[errorType]["requiredLength"]} symbols`;
          break;
        default:
        case "pattern":
          message = `Invalid image URL!`;        
          break;
      }
      this.errors[inputField] = message;
    }
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
