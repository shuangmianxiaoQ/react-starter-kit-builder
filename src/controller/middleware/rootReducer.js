// 代码拆分
export const injectReudcer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducer, key)) return;
  store.asyncReducer[key] = reducer;
  store.replaceReducer(makeRooReducer(store.asyncReducer));
};
