export const getLettersSchema = {
    description: 'Get words starting with a specific letter',
    tags: ['dictionary'],
    summary: 'Fetch words starting with a specific letter from a specific database',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            letter: { type: 'string' }
        },
        required: ['db', 'letter']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                words: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' }
                        }
                    }
                },
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
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const getEtymologiesSchema = {
    description: 'Get words by etymology',
    tags: ['dictionary'],
    summary: 'Fetch words with a specific etymology from a specific database',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            etymology: { type: 'string' }
        },
        required: ['db', 'etymology']
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
                                letters: { type: 'array', items: { type: 'string' } },
                                etymologies: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                },
                words: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' },
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const getArticlesSchema = {
    description: 'Get words by article',
    tags: ['dictionary'],
    summary: 'Fetch words with a specific article from a specific database',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            article: { type: 'string' }
        },
        required: ['db', 'article']
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
                        description: { type: 'string' },
                        filters: {
                            type: 'object',
                            properties: {
                                letters: { type: 'array', items: { type: 'string' } },
                                articles: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                },
                words: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const getGendersSchema = {
    description: 'Get words by gender',
    tags: ['dictionary'],
    summary: 'Fetch words with a specific gender from a specific database',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            gender: { type: 'string' }
        },
        required: ['db', 'gender']
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
                        description: { type: 'string' },
                        filters: {
                            type: 'object',
                            properties: {
                                letters: { type: 'array', items: { type: 'string' } },
                                genders: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                },
                words: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const getPatternsSchema = {
    description: 'Get words by pattern',
    tags: ['dictionary'],
    summary: 'Fetch words with a specific pattern from a specific database',
    params: {
        type: 'object',
        properties: {
            db: { type: 'string' },
            pattern: { type: 'string' }
        },
        required: ['db', 'pattern']
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
                        description: { type: 'string' },
                        filters: {
                            type: 'object',
                            properties: {
                                letters: { type: 'array', items: { type: 'string' } },
                                patterns: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                },
                words: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};