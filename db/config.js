require('dotenv').config()
//we us this query tracker format
//so we only track querys while in development mode
//to protech from outside tracking of queries
const options = {
    query: e => {
        if(process.env.NODE_ENV === 'dev') {
            console.log(e.query)
        }
    }
}

const pgp = require ('pg-promise')(options)

//modified to link database on deployment
function setDatabase() {
    if (process.env.NODE_ENV ===
        'development' || !process.env.NODE_ENV) 
        {
            return pgp ({
            database: process.env.DB_NAME,
            port: 5432,
            host: 'localhost',  
            })
        } else if (process.env.NODE_ENV === 'production') {
            return pgp(process.env.DATABASE_URL)
        }
}




module.exports = setDatabase()


// module.exports = pgp({
//     database: process.env.DB_NAME,
//     port: 5432,
//     host: 'localhost',
// })