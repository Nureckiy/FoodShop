export const create = (dispatch, actionType) =>
  function(data, status) {
    dispatch({
      type: actionType,
      data, status
    });
  };

export const createAsync = (serviceMethod, actionType, successActionType, failedActionType, data) => {
  return(dispatch) => {
    dispatch({
      type: actionType
    });
    const success = create(dispatch, successActionType);
    const fail = create(dispatch, failedActionType);
    data
      ? serviceMethod(data, success, fail)
      : serviceMethod(success, fail);
  };
};
