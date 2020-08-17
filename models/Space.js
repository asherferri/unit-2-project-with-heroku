const db = require('../db/config')

class Space {
    constructor(launch) {
        this.id = launch.id || null
        this.name = launch.name 
        this.launch_date = launch.launch_date
        this.launch_time = launch.launch_time
        this.lsp = launch.lsp
        this.pad = launch.pad
        this.location = launch.location
        this.cc = launch.cc
        this.mission = launch.mission || null
        /**add user id to launch table */
        this.user_id = launch.user_id || null
    }
    static getAll() {
        return db
        .manyOrNone('SELECT * FROM launch ORDER BY id ASC')
        .then((launches) => {
            return launches.map((launch) => new this(launch))
        })
    }

    static getById(id) {
        return db.oneOrNone('SELECT * FROM launch WHERE id = $1', id)
        .then(launch => {
            if(launch) return new this(launch)
            else throw new Error('that launch does not exist nerd, go to sleep')
        })
    }

    save() {
        /**add user id to launch table */
        return db.one(`INSERT INTO launch
        (name, launch_date, launch_time, lsp, pad, location, cc, mission, user_id)
        VALUES ($/name/, $/launch_date/, $/launch_time/, $/lsp/, $/pad/, $/location/, $/cc/, $/mission/, $/user_id/)
        RETURNING *`, this).then(launch => Object.assign(this, launch))
    }

    update(changes) {
        Object.assign(this, changes)
        return db
        .one(
            `UPDATE launch SET
            name = $/name/,
            launch_date = $/launch_date/,
            launch_time = $/launch_time/,
            lsp = $/lsp/,
            pad = $/pad/,
            location = $/location/,
            cc = $/cc/,
            mission = $/mission/
            WHERE id = $/id/
            RETURNING *`,
        this).then((launch) => Object.assign(this, launch))
    }

    delete() {
        return db.none('DELETE FROM launch WHERE id = $1', this.id)
    }

}

module.exports = Space
