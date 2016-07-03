import ServiceError from '../errors/ServiceError';
import NotFoundError from '../errors/NotFoundError';

function isSuccessful(response) {
  return response.status >= 200 && response.status < 300;
}

function isApiError(data) {
  return data && data.code && data.message;
}

export function throwIfNotSuccessful(response) {
  if (isSuccessful(response)) {
    return response;
  }

  if (!isApiError(response.data)) {
    throw new ServiceError(`Request failed with HTTP status code ${response.status}.`);
  }

  const { code, message } = response.data;
  switch (code) {
    case 'NotFound':
      throw new NotFoundError(message);
    // ...
    default:
      throw new ServiceError(message);
  }
}
