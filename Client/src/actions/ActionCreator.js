export const create = (dispatch, actionType, additionalInfo) =>
  function(data, status) {
    dispatch({
      type: actionType,
      data, status, ...additionalInfo
    });
  };

export const createAsync = (serviceMethod, actionType, successActionType, failedActionType, data, additionalInfo) => {
  return(dispatch) => {
    dispatch({
      type: actionType
    });
    const success = create(dispatch, successActionType, additionalInfo);
    const fail = create(dispatch, failedActionType, additionalInfo);
    data
      ? serviceMethod(data, success, fail)
      : serviceMethod(success, fail);
  };
};
