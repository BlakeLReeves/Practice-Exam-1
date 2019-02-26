export default {

    mysql: {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_SCHEMA,
        password: process.env.DB_PASS
    },
    auth: {
        secret: process.env.SECRET
    }
}