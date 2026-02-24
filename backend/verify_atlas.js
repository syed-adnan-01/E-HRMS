import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Employee from './src/models/employeeModel.js'; // Verify actual model name before doing this.

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas for verification.');

        // I should probably check the model name. 
        // Wait, let's just list collections or use mongoose.connection.db
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in DB:', collections.map(c => c.name));

        const employees = await mongoose.connection.db.collection('employees').find({}).toArray();
        console.log('Employees found in Atlas:');
        console.log(JSON.stringify(employees, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error verifying data:', error);
        process.exit(1);
    }
};

verify();
