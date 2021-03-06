class UserAlreadyRegisteredError extends Error {
    constructor(message="User already exists.") {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
    }
}
class UserLoginFailedError extends Error {
    constructor(message="Incorrect email or password.") {
        super(message);
        this.name = this.constructor.name;
        this.status = 401;
    }
}

class PermissionDeniedError extends Error {
    constructor(message="Permission denied.") {
        super(message);
        this.name = this.constructor.name;
        this.status = 401;
    }
}
class DuplicateProfileError extends Error {
    constructor(message="duplicate profile.") {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
    }
}
class UserDoesNotExist extends Error {
    constructor(message="user does not exist.") {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
    }
}
module.exports = {
    UserAlreadyRegisteredError,
    UserLoginFailedError,
    PermissionDeniedError,
    DuplicateProfileError,
    UserDoesNotExist,
};