import { combineReducers } from "redux";
import MenuReducer from "store/reducers/MenuReducer";
import ContentReducer from "store/reducers/ContentReducer";
import UserReducer from "../pages/authentication/AuthenticateState/UserReducer";

const rootReducer = combineReducers({
  MenuReducer,
  ContentReducer,
  UserReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
