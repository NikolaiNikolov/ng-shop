export class PostViewModel {
    constructor(
        private id: string,
        public title: string,
        public content: string,
        public categoryId: string,
        public image: string,
        public createdOn: Date,
        public authorId: string
    ) {  }

    get author() {
        return this.authorId;
    }

    get postId() {
        return this.id;
    }
}