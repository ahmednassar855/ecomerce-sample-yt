import mongoose from 'mongoose';

const dbConnection = async() => {
    mongoose.set('strictQuery', false)
    try {
        const conn =  await mongoose.connect(process.env.DB_MONGO)
        console.log(`data base connected successfully ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`data base connection error!!!! ${error}` .bgRed.white);
    }
  
}

export default dbConnection;