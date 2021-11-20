import { createStore, Reducer } from "redux";
import { IData, initState } from "../pages/Homepage/types";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// interface IReduxState extends IData {

// }

const rootReducer: Reducer<{ data: IData[] }> = (
  state = { data: initState },
  action
) => {
  switch (action.type) {
    case "INITIAL_API":
      return {
        ...state,
        data: action.value,
      };

    case "CREATE_TASK":
      return { ...state, data: [...state.data, action.value] };

    case "EDIT_TASK":
      let edited = state.data;

      let objIndex = edited.findIndex((obj) => obj.id === action.value.id);
      edited[objIndex] = action.value;

      return { ...state, data: edited };

    case "DELETE_TASK":
      let mirrorArr = state.data;

      let objtAfterDelete = mirrorArr.filter(
        (obj) => obj.id !== action.value.id
      );

      return {
        ...state,
        data: objtAfterDelete,
      };

    default:
      return state;
  }
  // return state;
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeRedux = createStore(persistedReducer);
export const persistor = persistStore(storeRedux);

// export const storeRedux = createStore(rootReducer);
