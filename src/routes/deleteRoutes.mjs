import dictModel, { Lexicographia, User } from "../model/model.mjs";
import { deleteDictionarySchema, deleteProfileSchema, deleteWordSchema } from "../schemas/deleteSchemas.mjs";
import mongoose from "mongoose";

const deleteRoutes = (fastify, options, done) => {

    fastify.delete('/api/:db/delete/word/:word', { schema: deleteWordSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const { db, word } = req.params;
        const userId = req.user._id;

        const dictionary = await dictModel(db);
        const result = await dictionary.deleteOne({ word: word });

        if (result.deletedCount === 1) {
            await Lexicographia.updateOne(
                { url: db, admin: userId },
                {
                    $set: { updatedAt: new Date() },
                    $inc: { total: -1 }
                }
            );
            return reply.send(`${word} deleted.`);
        } else {
            return reply.status(404).send('Word could not be deleted.');
        }
    });

    fastify.delete('/api/:db/delete/dictionary', { schema: deleteDictionarySchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const dbUrl = req.params.db;
        const userId = req.user._id;

        const deletedDictionary = await Lexicographia.findOneAndUpdate(
            { url: dbUrl, admin: userId },
            { $set: { updatedAt: new Date(), isDeleted: true } }
        );

        if (!deletedDictionary) {
            return reply.status(404).send('Dictionary not found or you do not have permission to delete it.');
        }

        const dictionary = await dictModel(dbUrl);
        const db = dictionary.db.client.db();

        const collectionName = dictionary.collection.name;
        const collections = await db.listCollections({ name: collectionName }).toArray();

        if (collections.length > 0) {
            await db.dropCollection(collectionName);
            return reply.send(`${deletedDictionary.name} deleted successfully!`);

        } else {
            return reply.status(404).send('Dictionary not found.');
        }
    });

    fastify.delete('/api/delete/profile', { schema: deleteProfileSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const userId = req.user._id;

        const profile = await User.findOneAndDelete({ _id: userId });

        await Lexicographia.updateMany(
            { admin: userId },
            { $set: { updatedAt: new Date(), deleted: true } }
        )

        return reply.send(`${profile} successfully deleted.`)
    });

    done();
}

export default deleteRoutes;