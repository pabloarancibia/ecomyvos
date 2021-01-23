module.exports = {
    secret: process.env.AUTH_SECRET || "Q6guqB@z6CP/e?qd40L4",
    expires: process.env.AUTH_EXPIRES || "24h",
    rounds: process.env.AUTH_ROUNDS || 10

}