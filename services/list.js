const Arome = require('../models/arome'),
  Recette = require('../models/recette'),
  User = require('../models/user');

const MAX_RECIPES_PER_PAGE = 8;
const MAX_AROMAS_PER_PAGE = 50;
const MAX_USERS_PER_PAGE = 50;

class listService {
  constructor(type) {
    this.model = getModel(type);
    this.max_items_per_page = getMaxItemsPerPage(type);
    this.filter = { nom: { $exists: true } };
    this.page = 1;
  }
  setFilter(filter) {
    this.filter = Object.assign(this.filter, filter);
    return this;
  }
  setPage(page) {
    this.page = page;
    return this;
  }
  async get() {
    return await this.model
      .find(this.filter)
      .skip((this.page - 1) * this.max_items_per_page)
      .limit(this.max_items_per_page)
      .exec();
  }
}

function getModel(type) {
  switch (type) {
    case 'recettes':
      return Recette;
    case 'aromes':
      return Arome;
    case 'users':
      return User;
  }
}

function getMaxItemsPerPage(type) {
  switch (type) {
    case 'recettes':
      return MAX_RECIPES_PER_PAGE;
    case 'aromes':
      return MAX_AROMAS_PER_PAGE;
    case 'users':
      return MAX_USERS_PER_PAGE;
  }
}

module.exports = listService;
