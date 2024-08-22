import dictModel, { Lexicographia, User } from "../model/model.mjs";
import { deleteDictionarySchema, deleteProfileSchema, deleteWordSchema } from "../schemas/deleteSchemas.mjs";

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
        const db = req.params.db;
        const userId = req.user._id;

        const deletedDictionary = await Lexicographia.findOneAndUpdate(
            { url: db, admin: userId },
            { $set: { updatedAt: new Date(), isDeleted: true } }
        );

        const dictionary = await dictModel(db);
        const droppedDict = await dictionary.collection.drop();
        console.log(droppedDict)
        return reply.send(`${deletedDictionary.name} deleted successfully!`)

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