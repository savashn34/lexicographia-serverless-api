import mongoose from "mongoose";
const { Schema } = mongoose

const usersMongoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, { timestamps: true });

export const User = mongoose.model("User", usersMongoSchema);

const lgMongoSchema = mongoose.Schema({
    name: String,
    url: String,
    description: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fields: {
        definitions: Boolean,
        equivalents: Boolean,
        articles: Boolean,
        genders: Boolean,
        examples: Boolean,
        terminologies: Boolean,
        pos: Boolean,
        etymologies: Boolean,
        spellings: Boolean,
        explanations: Boolean,
        roots: Boolean,
        patterns: Boolean,
    },
    filters: {
        letters: { type: Array, default: undefined },
        etymologies: { type: Array, default: undefined },
        genders: { type: Array, default: undefined },
        articles: { type: Array, default: undefined },
        pos: { type: Array, default: undefined },
        patterns: { type: Array, default: undefined }
    },
    total: Number,
    sources: Array,
    contact: String,
    isDeleted: Boolean,
}, { timestamps: true });

export const Lexicographia = mongoose.model("Lexicographia", lgMongoSchema);

const dictModel = async (url) => {
    const dictMongoSchema = new Schema({
        word: {
            type: String,
            required: true
        },
        etymology: String,
        spelling: String,
        article: String,
        gender: String,
        equivalents: {
            type: [{
                equivalent: String,
                article: String,
                gender: String,
                example: String,
                terminology: String,
                pos: String
            }],
            default: undefined,
            set: function (value) {
                return Array.isArray(value) && value.length > 0 && value.some(eq => eq.equivalent) ? value : undefined;
            }
        },
        definitions: {
            type: [{
                definition: String,
                terminology: String,
                pos: String,
                example: String
            }],
            default: undefined,
            set: function (value) {
                return Array.isArray(value) && value.length > 0 && value.some(def => def.definition) ? value : undefined;
            }
        },
        root: String,
        pattern: String,
        explanation: String,
    }, { collection: url });

    try {
        const Dictionary = mongoose.models[url] || mongoose.model(url, dictMongoSchema);
        return Dictionary;
    } catch (err) {
        throw err;
    }
};

export default dictModel;