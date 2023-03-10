import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./store";

// third-party
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import AuthenticatePage from "./pages/authentication/AuthenticateState/AuthenticatePage";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<AuthenticatePage>
				<BrowserRouter basename="/">
					<App />
				</BrowserRouter>
			</AuthenticatePage>
		</ReduxProvider>
	</React.StrictMode>
);
