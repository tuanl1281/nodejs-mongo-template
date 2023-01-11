import httpStatus from 'http-status';

const buildResultResponse = (response, {
  status = httpStatus.OK,
  message = null,
  data = null
}) => 
  response
    .status(status)
    .send({
      succeed: true,
      message,
      data,
    });

const buildPagingResponse = (response, { 
  status = httpStatus.OK, 
  totalCounts = 0, 
  data = []
}) => 
  response
    .status(status)
    .send({
      totalCounts,
      data,
    });

const buildErrorResponse = (response, {
  status = httpStatus.BAD_REQUEST,
  code = null,
  message = null,
  details = null
}) => 
  response
    .status(status)
    .send({
      succeed: false,
      error: {
        code,
        message,
        details
      },
      data: null
    });

export {
  buildResultResponse,
  buildPagingResponse,
  buildErrorResponse
};

export default {
  buildResultResponse,
  buildPagingResponse,
  buildErrorResponse
};