export class PostInputModel {
    constructor(
        private title: string,
        private content: string,
        private categoryId: string,
        private image: string
    ) {  }
}