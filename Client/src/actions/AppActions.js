import * as types from '../constants/AppConstants';
import service from '../service/service';
import { createAsync } from './ActionCreator';

export function sendFeedback(feedback) {
  return createAsync(service.sendFeedback,
    types.SEND_FEEDBACK,
    types.SEND_FEEDBACK_SUCCESS,
    types.SEND_FEEDBACK_FAIL,
    feedback
  );
}