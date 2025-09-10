mkdir test-app
cd test-app
npm init -y

# React + types
npm i react react-dom
npm i -D typescript @types/react @types/react-dom

# Vite 5 (phù hợp Node 18) + plugin
npm i -D vite@^5.4.10 @vitejs/plugin-react@^4.3.2

npm i @khanhphan1415/cart-ui-library

npx vite
# mở http://localhost:5173
