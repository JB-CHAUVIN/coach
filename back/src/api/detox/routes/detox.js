'use strict';

/**
 * detox router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::detox.detox');
