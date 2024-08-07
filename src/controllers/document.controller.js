const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentService } = require('../services');

const createDocument = catchAsync(async (req, res) => {
  const document = await documentService.createDocument(req.body);
  res.status(httpStatus.OK).send({
    data: document,
    message: 'Document created successfully',
  });
});

const getDocuments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'classes', 'student']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await documentService.queryDocuments(filter, options);
  res.send(result);
});

const getDocument = catchAsync(async (req, res) => {
  const document = await documentService.getDocumentById(req.params.documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  res.send(document);
});

const updateDocument = catchAsync(async (req, res) => {
  const document = await documentService.updateDocumentById(req.params.documentId, req.body);
  res.send(document);
});

const deleteDocument = catchAsync(async (req, res) => {
  await documentService.deleteDocumentById(req.params.documentId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
