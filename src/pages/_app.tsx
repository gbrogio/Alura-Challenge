import React from 'react';
import Head from 'next/head';

import { AppProps } from 'next/app';

import GlobalStyles, { Colors } from 'styles/global';

import { AuthProvider } from '../context/AuthContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AuthProvider>
    <Head>
      <meta name="description" content="GBrogio WebSite - Challenge Alura" />
      <meta name="viewport" content="viewport-fit=cover" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <Colors />
    <GlobalStyles />
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
