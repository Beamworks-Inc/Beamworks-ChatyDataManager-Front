import React from "react";
import { CircularProgress } from "@mui/material";
import AuthAPI from "../../../apis/Auth";
import RoleSelectDialog from "./RoleSelectDialog";
import { useDispatch } from "react-redux";
import { UserAction } from "./UserReducer";

type AuthState =
	| "UNDEFINED"
	| "NOT_AUTHENTICATED"
	| "AUTHENTICATED"
	| "NO_ROLE";

const AuthenticatePage = (props: { children: JSX.Element }) => {
	const [authState, setAuthState] = React.useState<AuthState>("UNDEFINED");
	const dispatch = useDispatch();

	// test code
	if (process.env.NODE_ENV === "development") {
		dispatch(
			UserAction.setUser({
				id: 1,
				name: "테스트계정",
				role: "USER",
				email: "",
			})
		);
		return props.children;
	}

	const checkAuthentication = () => {
		AuthAPI.getUserInfo()
			.then((response) => {
				const user = response.data;
				if (user.role == null) {
					setAuthState("NO_ROLE");
				} else {
					dispatch(UserAction.setUser(user));
					setAuthState("AUTHENTICATED");
				}
			})
			.catch((error) => {
				setAuthState("NOT_AUTHENTICATED");
			});
	};

	const navigateToGoogleLogin = () => {
		window.location.href = "/oauth2/authorization/google";
	};

	switch (authState) {
		case "UNDEFINED":
			checkAuthentication();
			return (
				<div>
					<CircularProgress />
					Check Authentication...
				</div>
			);
		case "NOT_AUTHENTICATED":
			navigateToGoogleLogin();
			return <CircularProgress />;
		case "NO_ROLE":
			return <RoleSelectDialog />;
		case "AUTHENTICATED":
			return props.children;
		default:
			return <div>This Component never be rendered</div>;
	}
};
export default AuthenticatePage;
