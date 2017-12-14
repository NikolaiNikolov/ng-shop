import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { APP_KEY } from '../../config/kinvey.config';
import { CommentInputModel } from '../../models/input-models/comment-input.model';
import { CommentViewModel } from '../../models/view-models/comment-view.model';

const commentsUrl = `https://baas.kinvey.com/appdata/${APP_KEY}/comments/`;

@Injectable()
export class CommentService {

  constructor(
    private http : HttpClientService
  ) { }

  getComments(postId) {
    return this.http.get(`${commentsUrl}?query={"postId":"${postId}"}&sort={"_kmd.lmt": -1}`, 'Kinvey')
    .map(comments => {
      let commentsModels = [];
      for (let comment of comments) {

        commentsModels.push(new CommentViewModel(comment._id, comment.author, comment.postId, comment.content, comment._kmd.lmt));
      }
      return commentsModels;
    });
  }

  getUserComments(userId) {
    return this.http.get(`${commentsUrl}?query={"_acl.creator":"${userId}"}`, 'Kinvey')
    .map(comments => {
      let commentsModels = [];
      for (let comment of comments) {
        commentsModels.push(new CommentViewModel(comment._id, comment.author, comment.postId, comment.content, comment._kmd.lmt));
      }
      return commentsModels;
    });
  }

  postComment(commentModel : CommentInputModel) {    
    return this.http.post(commentsUrl, commentModel, 'Kinvey');
  }

  deleteComment(id) {
    return this.http.delete(commentsUrl, id, "Kinvey");
  }
}
