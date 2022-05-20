import mongoose from "mongoose";
// String de conexão
mongoose.connect("mongodb+srv://alura:123@cluster0.5mwbv.mongodb.net/alura-node");

let db = mongoose.connection;

export default db; 

