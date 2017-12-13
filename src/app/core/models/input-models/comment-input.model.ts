export class CommentInputModel {
    constructor(
        private postId : string,
        private content : string
    ) {  }

    set setPostId(id) {
        this.postId = id;
    }
}