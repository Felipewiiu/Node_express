import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://felipewiiu3:1234@cluster0.nlxor4e.mongodb.net/Alura-node"); // string de conexão

let db = mongoose.connection;

export default db;