export class RegisterInputModel {
    constructor(
        private username: string,
        private firstName: string,
        private lastName: string,
        private password: string,
        private confirm: string
    ) {  }
}