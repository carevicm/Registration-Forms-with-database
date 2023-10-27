import { connectToDatabase } from '../utils/db.js';
import User from '../models/User.js';

export async function insertUser(req, res, next) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const result = await collection.insertOne({ fullName: "John Example" });
        res.send(`Document inserted with _id: ${result.insertedId}`);
    } catch (err) {
        next(err);
    }
}

export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
}
