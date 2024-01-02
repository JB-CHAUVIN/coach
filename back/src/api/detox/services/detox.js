'use strict';

/**
 * detox service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::detox.detox');
