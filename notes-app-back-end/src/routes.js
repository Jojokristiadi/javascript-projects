const { addNoteHandler } = require('./handler');

const routes = [
  {
    // eslint-disable-next-line quotes
    method: "POST",
    // eslint-disable-next-line quotes
    path: "/notes",
    handler: addNoteHandler,
    option: {
      cors: {
        origin: ['*'],
      },
    },
  },
];

module.exports = routes;
