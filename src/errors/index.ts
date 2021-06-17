export class UserNotFoundError extends Error {
    constructor(m?: string) {
        super(m)

        Object.setPrototypeOf(this, UserNotFoundError.prototype)
    }
}

export class IncorrectCredentialsError extends Error {
    constructor(m?: string) {
        super(m)

        Object.setPrototypeOf(this, IncorrectCredentialsError.prototype)
    }
}