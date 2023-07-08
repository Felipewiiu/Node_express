import mongoose from "mongoose";

mongoose.connect(process.env.STRING_CONEXAO_DB); // string de conexão

let db = mongoose.connection;

export default db;