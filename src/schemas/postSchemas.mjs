export const addWordSchema = {
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
                    }
                },
                nullable: true
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
                },
                nullable: true
            },
            explanation: { type: 'string', nullable: true }
        },
        required: ['word']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            },
            required: ['success', 'message']
        },
        403: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        },
        404: {
            type: 'string',
            example: 'Dictionary not found.'
        },
        500: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                error: { type: 'string' }
            },
            required: ['success', 'message', 'error']
        }
    }
};

export const createDictionarySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            url: { type: 'string', minLength: 3, maxLength: 16 },
            description: { type: 'string', nullable: true },
            contact: { type: 'string' },
            sources: { type: 'array' },
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
        },
        required: ['name', 'url']
    },
    response: {
        200: {
            type: 'string'
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
};

export const loginSchema = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['username', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' }
            },
            required: ['token']
        },
        400: {
            type: 'string',
            example: 'Invalid username or password.'
        }
    }
};

export const registerSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            username: {
                type: 'string',
                minLength: 3,
                maxLength: 16
            },
            email: { type: 'string', format: 'email' },
            password: {
                type: 'string',
                minLength: 8
            }
        },
        required: ['name', 'username', 'email', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' }
            },
            required: ['token']
        },
        400: {
            type: 'string',
            example: 'This username or e-mail address already has been using by another user.'
        }
    }
};