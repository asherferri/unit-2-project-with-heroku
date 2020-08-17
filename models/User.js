const db = require('../db/config')
const Space = require('./Space')

class User {
    constructor({id, username, email, password_digest}) {
        this.id = id || null
        this.username = username
        this.email = email
        this.password_digest = password_digest
    }
    
    static findByUserName(username) {
        return db
        .oneOrNone('SELECT * FROM users WHERE username = $1', username)
        .then((user) => {
            if(user) return new this(user)
            else throw new Error('THat User does not exists')
        })
    }

    save() {
        return db
        .one(`INSERT INTO users
            (username, email, password_digest)
            VALUES ($/username/,$/email/,$/password_digest/)
            RETURNING *`, this)
            .then((savedUser) => Object.assign(this, savedUser))
    }

    //adding new method findUserLaunches
    findUserLaunches() {
        return db
        .manyOrNone('SELECT * FROM launch WHERE user_id = $1', this.id)
        .then((launches) => {
            return launches.map((launch) => new Space(launch))
        })
    }

}

module.exports = User
