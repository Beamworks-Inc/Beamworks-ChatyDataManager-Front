import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./store";

// third-party
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import AuthenticatePage from "./pages/authentication/AuthenticateState/AuthenticatePage";
import RoleSelectDialog from "./pages/authentication/AuthenticateState/RoleSelectDialog";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

	<React.StrictMode>
		<ReduxProvider store={store}>
			<BrowserRouter basename="/">
				<App />
			</BrowserRouter>
		</ReduxProvider>
	</React.StrictMode>
);
