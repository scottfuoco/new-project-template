find . -name "node_modules" -type d -prune -exec rm -rf {} \; \
&& find . -name "dist" -type d -prune -exec rm -rf {} \; \
&& find . -name ".turbo" -type d -prune -exec rm -rf {} \; \
&& find . -name "logs" -type d -prune -exec rm -rf {} \; \
&& find . -name ".next" -type d -prune -exec rm -rf {} \; \
&& find . -name ".sanity" -type d -prune -exec rm -rf {} \; \
&& find . -name ".tsbuildinfo" -type f -exec rm -rf {} \; \
&& pnpm store prune;