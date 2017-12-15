import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client/http-client.service';
import { APP_KEY } from '../config/kinvey.config';
import { PostViewModel } from '../models/view-models/post-view.model';
import { Observable } from 'rxjs/Observable';
import { CategoriesViewModel } from '../models/view-models/categories-view.model';

const allPostsUrl = `https://baas.kinvey.com/appdata/${APP_KEY}/posts/`;
const allCategoriesUrl = `https://baas.kinvey.com/appdata/${APP_KEY}/categories/`;

@Injectable()
export class PostService {

  constructor(
    private http: HttpClientService
  ) { }

  getAllPosts() : Observable<any> {
    return this.http.get(`${allPostsUrl}?query={}&sort={"_kmd.lmt": -1}`, 'Kinvey')
    .map(posts => {
    let postModels = [];
    for (let post of posts) {
      postModels.push(this.makeViewModel(post))      
    }
     return postModels
    });
  }

  getPost(id) : Observable<any> {
    return this.http.get(allPostsUrl + id, 'Kinvey')
    .map(post => {
      return this.makeViewModel(post);
    })
  }

  createPost(body) {
    return this.http.post(allPostsUrl, body, 'Kinvey');
  }

  editPost(id, body) {
    return this.http.put(allPostsUrl + id, body, "Kinvey");
  }

  deletePost(id) {
    return this.http.delete(allPostsUrl, id, 'Kinvey');
  }

  getUserPosts(userId) {
    return this.http.get(`${allPostsUrl}?query={"_acl.creator":"${userId}"}`, "Kinvey")
    .map(posts => {
      let postViewModels = [];
      for (let post of posts) {
        postViewModels.push(this.makeViewModel(post));
      }
      
      return postViewModels;
    });
  }

  getAllCategories() {
    return this.http.get(allCategoriesUrl, "Kinvey")
    .map(categories => {
      let categoriesModels = [];
      for (let category of categories) {
        categoriesModels.push(new CategoriesViewModel(category._id, category.name))
      }

      return categoriesModels;
    })
  }

  makeViewModel(kinveyData) {
    return new PostViewModel(
      kinveyData._id,
      kinveyData.title,
      kinveyData.content,
      kinveyData.categoryId,
      kinveyData.image,
      new Date(kinveyData._kmd.ect),
      kinveyData._acl.creator
    );
  }

}
