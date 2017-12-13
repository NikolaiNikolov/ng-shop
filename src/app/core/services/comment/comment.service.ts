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
    return this.http.get(`${commentsUrl}?query={"postId":"${postId}"}`, 'Kinvey');
  }

  postComment(commentModel : CommentInputModel) {
    
    return this.http.post(commentsUrl, commentModel, 'Kinvey');
  }
}
