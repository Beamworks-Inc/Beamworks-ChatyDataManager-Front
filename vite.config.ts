import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const SERVER_URI =
	"http://beamworksplatformserverdev-env.eba-i9faxcnp.ap-northeast-2.elasticbeanstalk.com";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		proxy: {
			"/api": {
				target: SERVER_URI,
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
	// resolve: {
	//   alias: {
	//     src: "/src",
	//   },
	// },
});
