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
    return response;
  }
  const response = h.response({
    // eslint-disable-next-line quotes
    status: "fail",
    // eslint-disable-next-line quotes
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
  // eslint-disable-next-line indent
};
