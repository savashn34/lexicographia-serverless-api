"use strict";

import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from '@fastify/cors';
import fastifyJWT from '@fastify/jwt';
import helmet from '@fastify/helmet';
import mongoose from 'mongoose';

const fastify = Fastify({
    logger: true,
});

await fastify.register(helmet);

await fastify.register(cors, {
    origin: "https://lexicographia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
});

await fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET
});

fastify.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

fastify.decorate('admin', async function (request, reply) {
    try {
        const token = request.headers.authorization;
        if (!token) {
            request.isAuthenticated = false;
            return;
        }

        const decoded = await request.jwtVerify(token);
        request.user = decoded;
        request.isAuthenticated = true;
    } catch (err) {
        request.isAuthenticated = false;
    }
});

fastify.register(import("../src/routes/getRoutes.mjs"));
fastify.register(import("../src/routes/postRoutes.mjs"));
fastify.register(import("../src/routes/putRoutes.mjs"));
fastify.register(import("../src/routes/deleteRoutes.mjs"));
fastify.register(import("../src/routes/filterRoutes.mjs"));
fastify.register(import("../src/routes/patchRoutes.mjs"));

export const options = {
    maxPoolSize: 10,
};

const dbConnection = async () => {
    (async () => {
        try {
            await mongoose.connect(process.env.MONGO_DB, options);
        } catch (err) {
            console.log(err);
        }
    })();
};

dbConnection();

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
});

export default async (req, res) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
}
