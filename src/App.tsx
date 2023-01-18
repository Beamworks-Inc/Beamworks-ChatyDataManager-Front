import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import {useDispatch} from "react-redux";
import {UserAction} from "./pages/authentication/AuthenticateState/UserReducer";

function App() {
    const dispatch = useDispatch();
    dispatch(UserAction.setUser({
        id: 1,
        name: "김민수",
        role: "USER",
        email: ""
    }));
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
