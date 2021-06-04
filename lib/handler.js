const { nanoid } = require('nanoid')
const notes = require('./notes')

/**
 * Add new note
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
function addNoteHandler(req, h) {
    const { title, tags, body } = req.payload
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const note = { id, title, tags, body, createdAt, updatedAt }
    notes.push(note)
    const succeed = notes.find((n) => n.id === id) !== undefined
    if (succeed) {
        return h
            .response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: { noteId: id },
            })
            .code(201)
    }
    return h
        .response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        })
        .code(500)
}

/**
 * Get all notes
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
function getAllNotesHandler(req, h) {
    return h
        .response({
            status: 'success',
            data: { notes },
        })
        .code(200)
}

/**
 * Get single note by note id
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
function getNoteByIdHandler(req, h) {
    const { id } = req.params
    const note = notes.find((n) => n.id === id)
    if (note) {
        return h
            .response({
                status: 'success',
                data: { note },
            })
            .code(200)
    }

    return h
        .response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        })
        .code(404)
}

/**
 * Edit note by id
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
function editNoteByIdHandler(req, h) {
    const { id } = req.params
    const { title, tags, body } = req.payload
    const updatedAt = new Date().toISOString()
    const targetIndex = notes.findIndex((n) => n.id === id)
    if (targetIndex !== -1) {
        notes[targetIndex] = {
            ...notes[targetIndex],
            title,
            tags,
            body,
            updatedAt,
        }

        return h
            .response({
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            })
            .code(200)
    }

    return h
        .response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Catatan tidak ditemukan',
        })
        .code(404)
}

/**
 * Delete single note by id
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
function deleteNoteByIdHandler(req, h) {
    const { id } = req.params
    const targetIndex = notes.findIndex((n) => n.id === id)
    if (targetIndex !== -1) {
        notes.splice(targetIndex, 1)
        return h
            .response({
                status: 'success',
                message: 'Catatan berhasil dihapus',
            })
            .code(200)
    }

    return h
        .response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        })
        .code(404)
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
}
