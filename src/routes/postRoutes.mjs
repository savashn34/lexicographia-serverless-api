import dictModel, { Lexicographia, User } from "../model/model.mjs";
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { addWordSchema, createDictionarySchema, loginSchema, registerSchema } from "../schemas/postSchemas.mjs";

const postRoutes = (fastify, options, done) => {

    fastify.post('/api/:db/add/word', { schema: addWordSchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const db = req.params.db;
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const { word, etymology, spelling, article, gender, root, pattern, equivalents, definitions, explanation } = req.body;
            const userId = req.user._id;

            const dictionary = await dictModel(db);

            if (!dictionary) {
                return reply.status(404).send('Dictionary not found.');
            }

            const formattedWord = word.toLowerCase();
            const firstLetter = formattedWord.charAt(0).toUpperCase();

            const existingWord = await dictionary.findOne({ word: word });

            if (existingWord) {
                return reply.status(403).send({ error: 'This word already exist.' });
            }

            const newWordData = {
                word: formattedWord,
                etymology: etymology && etymology !== '' ? etymology : undefined,
                spelling: spelling && spelling !== '' ? spelling : undefined,
                article: article && article !== '' ? article : undefined,
                gender: gender && gender !== '' ? gender : undefined,
                root: root && root !== '' ? root : undefined,
                pattern: pattern && pattern !== '' ? pattern : undefined,
                equivalents: Array.isArray(equivalents) && equivalents.some(eq => eq.equivalent) ? equivalents : undefined,
                definitions: Array.isArray(definitions) && definitions.some(def => def.definition) ? definitions : undefined,
                explanation: explanation && explanation !== '' ? explanation : undefined
            };

            const collection = await Lexicographia.findOneAndUpdate(
                { url: db, admin: userId },
                {
                    $set: { updatedAt: new Date() },
                    $addToSet: {
                        'filters.letters': firstLetter,
                        'filters.etymologies': etymology && etymology !== '' ? etymology : undefined,
                        'filters.genders': gender && gender !== '' ? gender : undefined,
                        'filters.articles': article && article !== '' ? article : undefined,
                        'filters.patterns': pattern && pattern !== '' ? pattern : undefined
                    },
                    $inc: { total: 1 }
                },
                { session }
            );

            if (!collection) {
                return reply.status(403).send({ error: 'Forbidden: You are not allowed to edit this dictionary.' });
            }

            const newWord = new dictionary(newWordData);
            await newWord.save({ session });

            await session.commitTransaction();

            return reply.send({ success: true, message: 'Success!' });

        } catch (error) {
            await session.abortTransaction();
            console.error('Server error:', error);
            reply.status(500).send({ success: false, message: 'An error occured.', error: error.message });
        } finally {
            session.endSession();
        }
    });

    fastify.post('/api/create-dictionary', { schema: createDictionarySchema, onRequest: [fastify.authenticate] }, async (req, reply) => {
        const url = req.body.url;

        if (!url || url.length < 2) {
            throw new Error;
        }

        const existingDict = await Lexicographia.findOne({ url: url });

        if (existingDict) {
            return reply.status(400).send({ error: 'A dictionary with this URL is already exists' });
        }

        const newDict = await new Lexicographia({
            name: req.body.name,
            url: url,
            description: req.body.description,
            contact: req.body.contact,
            sources: req.body.sources,
            admin: req.user._id,
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
            }
        });

        await dictModel(url);
        await newDict.save();

        return reply.send(`${newDict} created successfully!`);

    });

    fastify.post('/login', { schema: loginSchema }, async (req, reply) => {
        const user = await User.findOne({
            $or: [
                { email: req.body.username },
                { username: req.body.username }
            ]
        });

        const isSuccess = await bcrypt.compare(req.body.password, user.password);

        if (!isSuccess) {
            return reply.status(400).send('Invalid password.')
        }

        const token = fastify.jwt.sign({ _id: user._id });
        reply.send({ token });
    });

    fastify.post('/api/register', { schema: registerSchema }, async (req, reply) => {
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (user) {
            return reply.status(400).send("This username or e-mail adress already has been using by another user.")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        const token = fastify.jwt.sign({ _id: newUser._id })
        reply.send({ token })
    });

    done();
}

export default postRoutes;
