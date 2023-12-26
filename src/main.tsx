"use client";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./lib/store/store.ts";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <NextUIProvider>
              <NextThemesProvider attribute="class" defaultTheme="dark" >
                <App />
              </NextThemesProvider>
          </NextUIProvider>
      </Provider>

  </React.StrictMode>,
)
