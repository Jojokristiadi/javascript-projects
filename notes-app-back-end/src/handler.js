const { nanoid } = require('nanoid');
const notes = require('./notes');
// eslint-disable-next-line no-unused-vars
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // eslint-disable-next-line no-undef
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  // eslint-disable-next-line no-undef
  notes.push(newNote);

  // eslint-disable-next-line no-undef
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      // eslint-disable-next-line quotes
      status: "success",
      // eslint-disable-next-line quotes
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    response.header('Access-Control-Allow-Origin', '*');
    return response;
  }
  const response = h.response({
    // eslint-disable-next-line quotes
    status: "fail",
    // eslint-disable-next-line quotes
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  response.header('Access-Control-Allow-Origin', '*');
  return response;
  // eslint-disable-next-line indent
};
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});
// eslint-disable-next-line no-unused-vars, consistent-return
const getNoteByIdHandler = (request, h) => {
  const { id } = request.param;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }
  const response = h.request({
    status: 'fail',
    message: 'pesan tidak ditemukan',

  });
  // eslint-disable-next-line padded-blocks
  response.code(404);
  return response;
};
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
