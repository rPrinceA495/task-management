export function createAction(type, payload) {
  return { type, ...payload };
}

export function createAsyncTypes(prefix) {
  return {
    REQUEST: `${prefix}_REQUEST`,
    SUCCESS: `${prefix}_SUCCESS`,
    FAILURE: `${prefix}_FAILURE`,
  };
}

export function createAsyncAction(fn, types, payload, condition) {
  return async (dispatch, getState) => {
    if (condition && !condition(getState())) {
      return;
    }
    dispatch({ type: types.REQUEST, ...payload });
    try {
      const result = await fn();
      dispatch({ type: types.SUCCESS, ...payload, result });
    } catch (error) {
      dispatch({ type: types.FAILURE, ...payload, error });
    }
  };
}
