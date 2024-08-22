import dictModel, { Lexicographia } from "../model/model.mjs";
import { getArticlesSchema, getEtymologiesSchema, getGendersSchema, getLettersSchema, getPatternsSchema } from "../schemas/filterSchemas.mjs";

const filterRoutes = (fastify, options, done) => {

    fastify.get('/api/:db/letters/:letter', { schema: getLettersSchema }, async (req, reply) => {
        const { db, letter } = req.params;

        const collection = await Lexicographia.findOne({ url: db }).select('name url filters.letters -_id')

        if (!collection || !collection.url || collection == 'undefined') {
            return reply.status(404).send(`${db} not found.`)
        }

        const dictionary = await dictModel(db);
        const words = await dictionary.find({ word: { $regex: `^${letter}`, $options: 'i' } }).select('word -_id').sort({ word: 1 });

        if (!words) {
            return reply.status(404).send('Not found.')
        }

        const total = words.length;

        const res = {
            words: words,
            dictionary: collection,
            total: total
        }

        return reply.send(res);
    });

    fastify.get('/api/:db/etymologies/:etymology', { schema: getEtymologiesSchema }, async (req, reply) => {
        const { db, etymology } = req.params;

        const collection = await Lexicographia.findOne({ url: db }).select('name url filters.letters filters.etymologies -_id');

        if (!collection || !collection.url || collection == 'undefined') {
            return reply.status(404).send(`${db} not found.`)
        }

        const dictionary = await dictModel(db);

        const words = await dictionary.find({ etymology: etymology }).select('word -_id').sort({ word: 1 });

        if (!words) {
            return reply.status(404).send('Not found.')
        }

        const total = words.length;

        const response = {
            dictionary: collection,
            words: words,
            total: total
        }

        return reply.send(response);
    });

    fastify.get('/api/:db/articles/:article', { schema: getArticlesSchema }, async (req, reply) => {
        const { db, article } = req.params;

        const collection = await Lexicographia.findOne({ url: db }).select('name url filters.letters filters.articles -_id');

        if (!collection || !collection.url || collection == 'undefined') {
            return reply.status(404).send(`${db} not found.`)
        }

        const dictionary = await dictModel(db);

        const words = await dictionary.find({ article: article }).select('word -_id').sort({ word: 1 });

        if (!words) {
            return reply.status(404).send('Not found.')
        }

        const total = words.length;

        const response = {
            dictionary: collection,
            words: words,
            total: total
        }

        return reply.send(response);
    });

    fastify.get('/api/:db/genders/:gender', { schema: getGendersSchema }, async (req, reply) => {
        const { db, gender } = req.params;

        const collection = await Lexicographia.findOne({ url: db }).select('name url filters.letters filters.genders -_id');

        if (!collection || !collection.url || collection == 'undefined') {
            return reply.status(404).send(`${db} not found.`)
        }

        const dictionary = await dictModel(db);

        const words = await dictionary.find({ gender: gender }).select('word -_id').sort({ word: 1 });

        if (!words) {
            return reply.status(404).send('Not found.')
        }

        const total = words.length;

        const response = {
            dictionary: collection,
            words: words,
            total: total
        }

        return reply.send(response);
    });

    fastify.get('/api/:db/patterns/:pattern', { schema: getPatternsSchema }, async (req, reply) => {
        const { db, pattern } = req.params;

        const collection = await Lexicographia.findOne({ url: db }).select('name url filters.letters filters.patterns -_id');

        if (!collection || !collection.url || collection == 'undefined') {
            return reply.status(404).send(`${db} not found.`)
        }

        const dictionary = await dictModel(db);

        const words = await dictionary.find({ pattern: pattern }).select('word -_id').sort({ word: 1 });

        if (!words) {
            return reply.status(404).send('Not found.')
        }

        const total = words.length;

        const response = {
            dictionary: collection,
            words: words,
            total: total
        }

        return reply.send(response);
    });

    done();
}

export default filterRoutes;