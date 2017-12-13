import { AuthenticationService } from "./authentication/authentication.service";
import { HttpClientService } from "./http-client/http-client.service";
import { PostService } from "./post.service";
import { CommentService } from "./comment/comment.service";

export const allServices  = [AuthenticationService, HttpClientService, PostService, CommentService];
