import { SWITCH_IMAGE, SOME_ASYNC_ACTION } from '../constants';

const switchImage = imageId => ({
  type: SWITCH_IMAGE,
  imageId
});

const someAsyncAction = payload => ({
  type: SOME_ASYNC_ACTION,
  payload
});

export { switchImage, someAsyncAction };
