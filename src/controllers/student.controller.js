const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');

const createStudent = catchAsync(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(httpStatus.OK).send({
    data: student,
    message: 'Student created successfully',
  });
});

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['parent', 'school', 'class', 'parent', 'gender']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudents(filter, options);
  res.send(result);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(student);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(req.params.studentId, req.body);
  res.send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.studentId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
