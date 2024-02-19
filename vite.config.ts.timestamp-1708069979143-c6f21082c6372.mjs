// vite.config.ts
import { defineConfig } from "file:///Users/gwon-oyeong/Project%20File/Project/IDE/IDE-FRONTEND/node_modules/vite/dist/node/index.js";
import react from "file:///Users/gwon-oyeong/Project%20File/Project/IDE/IDE-FRONTEND/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/gwon-oyeong/Project%20File/Project/IDE/IDE-FRONTEND/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/gwon-oyeong/Project File/Project/IDE/IDE-FRONTEND";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      { find: "@/src", replacement: resolve(__vite_injected_original_dirname, "src") },
      {
        find: "@/components",
        replacement: resolve(__vite_injected_original_dirname, "src/components")
      },
      {
        find: "@/pages",
        replacement: resolve(__vite_injected_original_dirname, "src/pages")
      },
      {
        find: "@/utils",
        replacement: resolve(__vite_injected_original_dirname, "src/utils")
      }
    ]
  },
  // define: {
  //   global: {},
  // },
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // WebSocket 및 HTTP 요청을 위한 프록시 설정
      "/ws": {
        target: "ws://43.203.66.34:8000/ws",
        ws: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3dvbi1veWVvbmcvUHJvamVjdCBGaWxlL1Byb2plY3QvSURFL0lERS1GUk9OVEVORFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2d3b24tb3llb25nL1Byb2plY3QgRmlsZS9Qcm9qZWN0L0lERS9JREUtRlJPTlRFTkQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2d3b24tb3llb25nL1Byb2plY3QlMjBGaWxlL1Byb2plY3QvSURFL0lERS1GUk9OVEVORC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6ICdAL3NyYycsIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL2NvbXBvbmVudHMnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AvcGFnZXMnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL3V0aWxzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIC8vIGRlZmluZToge1xuICAvLyAgIGdsb2JhbDoge30sXG4gIC8vIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgLy8gV2ViU29ja2V0IFx1QkMwRiBIVFRQIFx1QzY5NFx1Q0NBRFx1Qzc0NCBcdUM3MDRcdUQ1NUMgXHVENTA0XHVCODVEXHVDMkRDIFx1QzEyNFx1QzgxNVxuICAgICAgJy93cyc6IHtcbiAgICAgICAgdGFyZ2V0OiAnd3M6Ly80My4yMDMuNjYuMzQ6ODAwMC93cycsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRWLFNBQVMsb0JBQW9CO0FBQ3pYLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGVBQWU7QUFIeEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLFNBQVMsYUFBYSxRQUFRLGtDQUFXLEtBQUssRUFBRTtBQUFBLE1BQ3hEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDbEQ7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ2xDLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
