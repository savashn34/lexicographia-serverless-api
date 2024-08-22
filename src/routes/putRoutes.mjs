import dictModel, { Lexicographia, User } from "../model/model.mjs";
import { updateDictionarySchema, updateProfileSchema, updateWordSchema } from "../schemas/putSchemas.mjs";
import bcrypt from "bcrypt";

const putRoutes = (fastify, options, done) => {

    fastify.put('/api/:db/:word/edit', { schema: updateWordSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const { db, word } = req.params;

        const dictionary = await dictModel(db);

        const newWord = req.body.word.toLowerCase();
        const firstLetter = newWord.charAt(0).toUpperCase();

        const theWord = await dictionary.findOneAndUpdate({ word: word }, {
            $set: {
                word: newWord,
                etymology: req.body.etymology,
                spelling: req.body.spelling,
                article: req.body.article,
                gender: req.body.gender,
                root: req.body.root,
                pattern: req.body.pattern,
                equivalents: req.body.equivalents,
                definitions: req.body.definitions,
                explanation: req.body.explanation
            }
        });

        await Lexicographia.updateOne(
            { url: db },
            {
                $set: { updatedAt: new Date() },
                $addToSet: {
                    'filters.letters': firstLetter,
                    'filters.etymologies': req.body.etymology && req.body.etymology !== '' ? req.body.etymology : undefined,
                    'filters.genders': req.body.gender && req.body.gender !== '' ? req.body.gender : undefined,
                    'filters.articles': req.body.article && req.body.article !== '' ? req.body.article : undefined,
                    'filters.patterns': req.body.pattern && req.body.pattern !== '' ? req.body.pattern : undefined
                }
            }
        );

        return reply.send(theWord);

    });

    fastify.put('/api/:db/edit', { schema: updateDictionarySchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const db = req.params.db;
        const userId = req.user._id;

        const dictionary = await Lexicographia.findOneAndUpdate({ url: db, admin: userId }, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                contact: req.body.contact,
                sources: req.body.sources && req.body.sources !== '' ? req.body.sources : undefined,
                fields: {
                    definitions: req.body.definitions,
                    equivalents: req.body.equivalents,
                    articles: req.body.articles,
                    genders: req.body.genders,
                    examples: req.body.examples,
                    terminologies: req.body.terminologies,
                    pos: req.body.pos,
                    etymologies: req.body.etymologies,
                    spellings: req.body.spellings,
                    explanations: req.body.explanations,
                    roots: req.body.roots,
                    patterns: req.body.patterns,
                },
                updatedAt: new Date()
            }
        });

        if (!dictionary) {
            return reply.status(404);
        }

    });

    fastify.put('/api/profile', { schema: updateProfileSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const userId = req.user._id;

        const updateProfile = {
            name: req.body.name,
            email: req.body.email,
            question: req.body.question,
            answer: req.body.answer
        };

        if (req.body.password) {
            updateProfile.password = await bcrypt.hash(req.body.password, 10);
        }

        const profile = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updateProfile }
        );

        return reply.send(profile);
    });

    fastify.put('/api/change-password', async (req, reply) => {
        const { username, answer, password, repassword } = req.body;

        if (password !== repassword) {
            return reply.status(400).send('Passwords do not match.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.updateOne({
            answer: answer,
            $or: [
                { username: username },
                { email: username }
            ]
        }, { password: hashedPassword });

        if (!user) {
            return reply.status(404).send('User not found.')
        }

        return reply.send({ success: true })
    })

    done();
}

export default putRoutes;