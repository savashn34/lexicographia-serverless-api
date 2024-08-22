import { Lexicographia } from "../model/model.mjs";

const patchRoutes = (fastify, options, done) => {

    fastify.patch('/api/:db/letters/:letter', async (req, reply) => {
        const { db, letter } = req.params;
        const upperLetter = letter.toUpperCase();

        const document = await Lexicographia.findOneAndUpdate(
            { url: db },
            { $pull: { 'filters.letters': upperLetter } }
        )

        if (document) {
            return reply.send({ success: true });
        } else {
            return reply.status(404).send({ success: false, message: 'This letter is no longer exists.' });
        }
    });

    fastify.patch('/api/:db/etymologies/:etymology', async (req, reply) => {
        const { db, etymology } = req.params;

        const document = await Lexicographia.findOneAndUpdate(
            { url: db },
            { $pull: { 'filters.etymologies': etymology } }
        );

        if (document) {
            return reply.send({ success: true });
        } else {
            return reply.status(404).send({ success: false, message: 'This etymology is no longer exists.' });
        }
    });

    fastify.patch('/api/:db/articles/:article', async (req, reply) => {
        const { db, article } = req.params;

        const document = await Lexicographia.findOneAndUpdate(
            { url: db },
            { $pull: { 'filters.articles': article } }
        );

        if (document) {
            return reply.send({ success: true });
        } else {
            return reply.status(404).send({ success: false, message: 'This article is no longer exists.' });
        }
    });

    fastify.patch('/api/:db/genders/:gender', async (req, reply) => {
        const { db, gender } = req.params;

        const document = await Lexicographia.findOneAndUpdate(
            { url: db },
            { $pull: { 'filters.genders': gender } }
        );

        if (document) {
            return reply.send({ success: true });
        } else {
            return reply.status(404).send({ success: false, message: 'This gender is no longer exists.' });
        }
    });

    fastify.patch('/api/:db/patterns/:pattern', async (req, reply) => {
        const { db, pattern } = req.params;

        const document = await Lexicographia.findOneAndUpdate(
            { url: db },
            { $pull: { 'filters.patterns': pattern } }
        );

        if (document) {
            return reply.send({ success: true });
        } else {
            return reply.status(404).send({ success: false, message: 'This pattern is no longer exists.' });
        }
    });

    done();
}

export default patchRoutes;