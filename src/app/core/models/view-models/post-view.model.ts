export class PostViewModel {
    constructor(
        private id: string,
        private title: string,
        private content: string,
        private categoryId: string,
        private image: string,
        private createdOn: Date,
        private authorId: string
    ) {  }

    get author() {
        return this.authorId;
    }

    get postId() {
        return this.id;
    }
}