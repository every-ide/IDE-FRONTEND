// vite.config.ts
import { defineConfig } from "file:///Users/groomthon/Desktop/TeamProjects/IDE-FRONTEND/node_modules/vite/dist/node/index.js";
import react from "file:///Users/groomthon/Desktop/TeamProjects/IDE-FRONTEND/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/groomthon/Desktop/TeamProjects/IDE-FRONTEND/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/groomthon/Desktop/TeamProjects/IDE-FRONTEND";
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
  define: {
    global: {}
  },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3Jvb210aG9uL0Rlc2t0b3AvVGVhbVByb2plY3RzL0lERS1GUk9OVEVORFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dyb29tdGhvbi9EZXNrdG9wL1RlYW1Qcm9qZWN0cy9JREUtRlJPTlRFTkQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dyb29tdGhvbi9EZXNrdG9wL1RlYW1Qcm9qZWN0cy9JREUtRlJPTlRFTkQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnQC9zcmMnLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQC9jb21wb25lbnRzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL3BhZ2VzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQC91dGlscycsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6IHt9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgIC8vIFdlYlNvY2tldCBcdUJDMEYgSFRUUCBcdUM2OTRcdUNDQURcdUM3NDQgXHVDNzA0XHVENTVDIFx1RDUwNFx1Qjg1RFx1QzJEQyBcdUMxMjRcdUM4MTVcbiAgICAgICcvd3MnOiB7XG4gICAgICAgIHRhcmdldDogJ3dzOi8vNDMuMjAzLjY2LjM0OjgwMDAvd3MnLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VSxTQUFTLG9CQUFvQjtBQUNyVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxTQUFTLGFBQWEsUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUN4RDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ2xEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QztBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sUUFBUSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUNsQyxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQSxNQUVMLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
