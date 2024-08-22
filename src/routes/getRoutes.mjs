import dictModel, { Lexicographia, User } from "../model/model.mjs";
import { addWordSchema, dictionaryDetailsSchema, dictionaryEditSchema, dictionarySchema, editWordSchema, profileSchema, searchSchema, wordDetailsSchema } from "../schemas/getSchemas.mjs";

const getRoutes = (fastify, options, done) => {

    fastify.get('/api/:db/:word/edit', { schema: editWordSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const { db, word } = req.params;
        const userId = req.user._id;

        const collection = await Lexicographia.findOne({ url: db, admin: userId }).select('name url fields -_id');

        if (!collection) {
            return reply.status(403).send({ error: 'Forbidden: You are not allowed to edit this dictionary.' });
        }

        const dictionary = await dictModel(db);
        const theWord = await dictionary.findOne({ word: word }).select('-_id');

        if (!theWord || theWord == 'undefined') {
            return reply.status(404).send(`${word} not found.`)
        }

        const res = {
            dictionary: collection,
            word: theWord
        }

        return reply.send(res);
    });

    fastify.get('/api/:db/add/word', { schema: addWordSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const db = req.params.db;
        const userId = req.user._id;

        const collection = await Lexicographia.findOne({ admin: userId, url: db, isDeleted: { $exists: false } }).select('name url fields -_id');

        if (!collection) {
            return reply.status(403).send({ error: 'Forbidden: You are not allowed to edit this dictionary.' })
        }

        return reply.send(collection);
    });

    fastify.get('/api/:db/:word', { schema: wordDetailsSchema, onRequest: [fastify.admin] }, async (req, reply) => {
        const { db, word } = req.params;
        const userId = req.isAuthenticated ? req.user._id : null;

        const collection = await dictModel(db);

        const theWord = await collection.findOne({ word: word }).select('-_id');

        if (!theWord || theWord == 'undefined') {
            return reply.status(404).send(`${word} not found.`);
        }

        const dictionary = await Lexicographia.findOne({ url: db })
            .select('name url filters.letters -_id')
            .populate('admin', 'username _id');

        if (userId && dictionary.admin && userId === dictionary.admin._id.toString()) {
            const res = {
                word: theWord,
                dictionary: dictionary
            };
            return reply.send(res);
        } else {
            const res = {
                word: theWord,
                dictionary: {
                    name: dictionary.name,
                    url: dictionary.url,
                    description: dictionary.description,
                    letters: dictionary.letters
                }
            };
            return reply.send(res);
        }
    });

    fastify.get('/api/:db/search', { schema: searchSchema }, async (req, reply) => {
        const db = req.params.db;
        const word = req.query.word;

        const levenshteinDistance = (a, b) => {
            const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
            for (let i = 1; i <= a.length; i++) {
                matrix[0].push(i);
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        };

        const dictionary = await Lexicographia.findOne({ url: db }).select('name url filters.letters -_id');
        const collection = await dictModel(db);
        const words = await collection.find().select('word -_id');

        if (words.length === 0) {
            return reply.status(404).send(`${word} not found.`);
        }

        const results = words
            .map((w) => ({
                word: w.word,
                distance: levenshteinDistance(word.toLowerCase(), w.word.toLowerCase())
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10);

        const res = {
            dictionary,
            search: results
        };

        return reply.send(res);
    });

    fastify.get('/api/:db/edit', { schema: dictionaryEditSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const db = req.params.db;
        const userId = req.user._id;

        const dictionary = await Lexicographia.findOne({ admin: userId, url: db, isDeleted: { $exists: false } }).select('name url description fields sources contact -_id');

        if (!dictionary) {
            return reply.status(403).send({ error: 'Forbidden: You are not allowed to edit this dictionary.' });
        }

        return reply.send(dictionary);
    });

    fastify.get('/api/:db', { schema: dictionaryDetailsSchema }, async (req, reply) => {
        const db = req.params.db;
        const res = await Lexicographia.findOne({ url: db }).select('-_id').populate('admin', 'name username -_id');

        if (!res) {
            return reply.status(404).send('Not found.')
        }

        return reply.send(res);
    });

    fastify.get('/api/dictionary', { schema: dictionarySchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const userId = req.user._id;

        const collections = await Lexicographia.find({ admin: userId, isDeleted: { $exists: false } }).select('name url -_id');
        return reply.send(collections);
    });

    fastify.get('/api/profile', { schema: profileSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const userId = req.user._id;

        const profile = await User.findOne({ _id: userId }).select('name username email -_id');

        if (!profile) {
            return reply.status(403).send({ error: 'Forbidden: You are not allowed to see this page.' })
        }

        return reply.send(profile);
    });

    done();
}

export default getRoutes;