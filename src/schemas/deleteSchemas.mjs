export const deleteWordSchema = {
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            word: { type: 'string' }
        },
        required: ['db', 'word']
    },
    response: {
        200: {
            type: 'string',
            example: 'word deleted.'
        },
        403: {
            type: 'string',
            example: 'Forbidden: You are not allowed to edit this dictionary.'
        },
        404: {
            type: 'string',
            example: 'Word could not be deleted.'
        },
        500: {
            type: 'string',
            example: 'Server error.'
        }
    }
};

export const deleteDictionarySchema = {
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' }
        },
        required: ['db']
    },
    response: {
        200: {
            type: 'string',
            example: 'Dictionary deleted successfully!'
        },
        403: {
            type: 'string',
            example: 'Forbidden: You are not allowed to delete this dictionary.'
        },
        404: {
            type: 'string',
            example: 'Dictionary could not be deleted.'
        },
        500: {
            type: 'string',
            example: 'Server error.'
        }
    }
};

export const deleteProfileSchema = {
    response: {
        200: {
            type: 'string',
            example: 'Profile successfully deleted.'
        },
        404: {
            type: 'string',
            example: 'Profile could not be deleted.'
        },
        500: {
            type: 'string',
            example: 'Server error.'
        }
    }
};