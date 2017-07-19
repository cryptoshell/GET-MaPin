exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Nikolai'}),
        knex('users').insert({id: 2, name: 'Kai'}),
        knex('users').insert({id: 3, name: 'Yelim'})
      ]);
    });
};
