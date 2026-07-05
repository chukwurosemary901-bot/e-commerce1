import dotenv from 'dotenv'


dotenv.config()

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
export const config ={
    port: process.env.PORT,
    access: process.env.ACCESS_TOKEN,
    refresh: process.env.REFRESH_TOKEN,
    origins: allowedOrigins,
DB:{
password: process.env.DB_PASS,
username: process.env.DB_USER,
databaseName: process.env.DB_NAME

},
PS:{
    publicKey: process.env.PAY_STACK_PUBLIC_KEY,
    secretKey: process.env.PAY_STACK_SECRET_KEY,
    baseUrl: process.env.BASE_URL
},
APP:{
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASS
}

}
