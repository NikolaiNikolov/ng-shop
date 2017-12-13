import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client/http-client.service';
import { APP_KEY } from '../config/kinvey.config';
import { PostViewModel } from '../models/view-models/post-view.model';
import { Observable } from 'rxjs/Observable';

const allPostsUrl = `https://baas.kinvey.com/appdata/${APP_KEY}/posts/`;

@Injectable()
export class PostService {

  constructor(
    private http: HttpClientService
  ) { }

  getAllPosts() : Observable<any> {
    return this.http.get(allPostsUrl, 'Kinvey')
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

  deletePost(id) {
    return this.http.delete(allPostsUrl, id, 'Kinvey');
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
