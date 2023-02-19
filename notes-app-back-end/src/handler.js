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
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
    // eslint-disable-next-line indent
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
    // eslint-disable-next-line indent
  response.code(404);
  return response;
};
// eslint-disable-next-line consistent-return
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  // eslint-disable-next-line spaced-comment
  //Bila index bernilai -1, maka kembalikan handler dengan respons gagal.
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // eslint-disable-next-line no-unused-vars
  const response = h.response({
    status: 'fail',
    message: 'Gagal bro untuk hapus',
  });
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
// eslint-disable-next-line eol-last
};