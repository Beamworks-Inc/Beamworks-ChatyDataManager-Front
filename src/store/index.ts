import { combineReducers } from "redux";
import MenuReducer from "store/reducers/MenuReducer";
import ContentReducer from "store/reducers/ContentReducer";

const rootReducer = combineReducers({
  MenuReducer,
  ContentReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
