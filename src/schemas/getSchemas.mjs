export const editWordSchema = {
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
            type: 'object',
            properties: {
                dictionary: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        url: { type: 'string' },
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
                    required: ['name', 'url']
                },
                word: {
                    type: 'object',
                    properties: {
                        word: { type: 'string' },
                        etymology: { type: 'string' },
                        spelling: { type: 'string' },
                        article: { type: 'string' },
                        gender: { type: 'string' },
                        equivalents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    equivalent: { type: 'string' },
                                    article: { type: 'string' },
                                    gender: { type: 'string' },
                                    example: { type: 'string' },
                                    terminology: { type: 'string' },
                                    pos: { type: 'string' }
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
                                    terminology: { type: 'string' },
                                    pos: { type: 'string' },
                                    example: { type: 'string' }
                                },
                                required: ['definition']
                            }
                        },
                        root: { type: 'string' },
                        pattern: { type: 'string' },
                        explanation: { type: 'string' }
                    },
                    required: ['word']
                }
            },
            required: ['dictionary', 'word']
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
            example: 'exampleWord not found.'
        }
    }
};

export const addWordSchema = {
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' }
        },
        required: ['db']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                url: { type: 'string' },
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
            required: ['name', 'url']
        },
        403: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
};

export const wordDetailsSchema = {
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
            type: 'object',
            properties: {
                word: {
                    type: 'object',
                    properties: {
                        word: { type: 'string' },
                        etymology: { type: 'string' },
                        spelling: { type: 'string' },
                        article: { type: 'string' },
                        gender: { type: 'string' },
                        equivalents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    equivalent: { type: 'string' },
                                    article: { type: 'string' },
                                    gender: { type: 'string' },
                                    example: { type: 'string' },
                                    terminology: { type: 'string' },
                                    pos: { type: 'string' }
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
                                    terminology: { type: 'string' },
                                    pos: { type: 'string' },
                                    example: { type: 'string' }
                                },
                                required: ['definition']
                            }
                        },
                        root: { type: 'string' },
                        pattern: { type: 'string' },
                        explanation: { type: 'string' }
                    },
                    required: ['word']
                },
                dictionary: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        url: { type: 'string' },
                        description: { type: 'string' },
                        filters: {
                            type: 'object',
                            properties: {
                                letters: { type: 'array', items: { type: 'string' } }
                            }
                        },
                        admin: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                _id: { type: 'string' }
                            }
                        }
                    },
                    required: ['name', 'url']
                }
            },
            required: ['word', 'dictionary']
        },
        404: {
            type: 'string',
            example: 'exampleWord not found.'
        }
    }
};

export const searchSchema = {
    querystring: {
        type: 'object',
        properties: {
            word: { type: 'string' }
        },
        required: ['word']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                dictionary: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        url: { type: 'string' },
                        filters: {
                            type: 'object',
                            properties: {
                                letters: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    },
                    required: ['url']
                },
                search: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' },
                            distance: { type: 'integer' }
                        },
                        required: ['word', 'distance']
                    }
                }
            },
            required: ['dictionary', 'search']
        },
        404: {
            type: 'string',
            example: 'exampleWord not found.'
        }
    }
};

export const dictionaryEditSchema = {
    description: 'Get dictionary details for editing',
    tags: ['dictionary'],
    summary: 'Fetch dictionary details for a specific database if the user is authorized to edit it',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' }
        },
        required: ['db']
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
                },
                sources: { type: 'array' },
                contact: { type: 'string' }
            },
            required: ['name', 'url', 'fields']
        },
        403: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
};

export const dictionaryDetailsSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                url: { type: 'string' },
                description: { type: 'string' },
                filters: {
                    type: 'object',
                    properties: {
                        articles: { type: 'array', items: { type: 'string' } },
                        etymologies: { type: 'array', items: { type: 'string' } },
                        genders: { type: 'array', items: { type: 'string' } },
                        letters: { type: 'array', items: { type: 'string' } },
                        patterns: { type: 'array', items: { type: 'string' } }
                    }
                },
                total: { type: 'integer' },
                sources: { type: 'array' },
                contact: { type: 'string' },
                isDeleted: { type: 'boolean' },
                admin: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        username: { type: 'string' }
                    }
                },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            },
            required: ['name', 'url']
        },
        404: {
            type: 'string',
            example: 'Not found.'
        }
    }
};

export const dictionarySchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    url: { type: 'string' }
                },
                required: ['name', 'url']
            }
        }
    }
};

export const profileSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string', format: 'email' }
            },
            required: ['name', 'username', 'email']
        },
        403: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
};