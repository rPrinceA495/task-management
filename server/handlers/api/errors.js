import NotFoundError from '../../../common/errors/NotFoundError';

function setError(context, statusCode, errorCode, errorMessage) {
  context.status = statusCode;
  context.body = {
    code: errorCode,
    message: errorMessage,
  };
}

export default function* errors(next) {
  try {
    yield next;
  } catch (error) {
    if (error instanceof NotFoundError) {
      setError(this, 404, 'NotFound', error.message);
    } else {
      setError(this, 500, 'InternalError', 'An internal error has occurred.');
    }
    // TODO: log the error
    console.log(error);
  }
}
