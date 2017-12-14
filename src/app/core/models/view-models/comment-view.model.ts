export class CommentViewModel {
    constructor(
        public id : string,
        public author,
        private postId : string,
        private content : string,
        private createdOn : string,
    ) {  }

    get commentId() {
        return this.id;
    }
}