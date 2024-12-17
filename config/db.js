const mongoose = require("mongoose")

const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/backend-contacts");
        console.log("Database Connected" ,
            connect.connection.host,
        connect.connection.name);

        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDb;
