export const updateWordSchema = {
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            word: { type: 'string' }
        },
        required: ['db', 'word']
    },
    body: {
        type: 'object',
        properties: {
            word: { type: 'string' },
            etymology: { type: 'string', nullable: true },
            spelling: { type: 'string', nullable: true },
            article: { type: 'string', nullable: true },
            gender: { type: 'string', nullable: true },
            root: { type: 'string', nullable: true },
            pattern: { type: 'string', nullable: true },
            equivalents: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        equivalent: { type: 'string' },
                        article: { type: 'string', nullable: true },
                        gender: { type: 'string', nullable: true },
                        example: { type: 'string', nullable: true },
                        terminology: { type: 'string', nullable: true },
                        pos: { type: 'string', nullable: true }
                    },
                    required: ['equivalent']
                }
            },
            definitions: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        definition: { type: 'string' },
                        terminology: { type: 'string', nullable: true },
                        pos: { type: 'string', nullable: true },
                        example: { type: 'string', nullable: true }
                    },
                    required: ['definition']
                }
            },
            explanation: { type: 'string', nullable: true }
        },
        required: ['word']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                word: { type: 'string' },
                url: { type: 'string' },
                etymology: { type: 'string', nullable: true },
                spelling: { type: 'string', nullable: true },
                article: { type: 'string', nullable: true },
                gender: { type: 'string', nullable: true },
                root: { type: 'string', nullable: true },
                pattern: { type: 'string', nullable: true },
                equivalents: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            equivalent: { type: 'string' },
                            article: { type: 'string', nullable: true },
                            gender: { type: 'string', nullable: true },
                            example: { type: 'string', nullable: true },
                            terminology: { type: 'string', nullable: true },
                            pos: { type: 'string', nullable: true }
                        }
                    }
                },
                definitions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            definition: { type: 'string' },
                            terminology: { type: 'string', nullable: true },
                            pos: { type: 'string', nullable: true },
                            example: { type: 'string', nullable: true }
                        }
                    }
                },
                explanation: { type: 'string', nullable: true }
            }
        },
        404: {
            type: 'string',
            example: 'Word not found.'
        },
        403: {
            type: 'string',
            example: 'Forbidden: You are not allowed to edit this dictionary.'
        }
    }
};

export const updateDictionarySchema = {
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' }
        },
        required: ['db']
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            contact: { type: 'string' },
            sources: { type: 'array' },
            fields: {
                type: 'object',
                properties: {
                    definitions: { type: 'boolean' },
                    equivalents: { type: 'boolean' },
                    articles: { type: 'boolean' },
                    genders: { type: 'boolean' },
                    examples: { type: 'boolean' },
                    terminologies: { type: 'boolean' },
                    pos: { type: 'boolean' },
                    etymologies: { type: 'boolean' },
                    spellings: { type: 'boolean' },
                    explanations: { type: 'boolean' },
                    roots: { type: 'boolean' },
                    patterns: { type: 'boolean' }
                }
            }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                url: { type: 'string' },
                description: { type: 'string' },
                fields: {
                    type: 'object',
                    properties: {
                        definitions: { type: 'boolean' },
                        equivalents: { type: 'boolean' },
                        articles: { type: 'boolean' },
                        genders: { type: 'boolean' },
                        examples: { type: 'boolean' },
                        terminologies: { type: 'boolean' },
                        pos: { type: 'boolean' },
                        etymologies: { type: 'boolean' },
                        spellings: { type: 'boolean' },
                        explanations: { type: 'boolean' },
                        roots: { type: 'boolean' },
                        patterns: { type: 'boolean' }
                    }
                }
            }
        },
        404: {
            type: 'string',
            example: 'Dictionary not found.'
        }
    }
};

export const updateProfileSchema = {
    description: 'Update user profile',
    tags: ['profile'],
    summary: 'Update the profile of a logged-in user',
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            question: { type: 'string' },
            answer: { type: 'string' },
            password: { type: 'string', minLength: 8 }
        },
        required: ['name', 'username', 'email', 'question', 'answer'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                question: { type: 'string' },
                answer: { type: 'string' }
            }
        }
    }
};