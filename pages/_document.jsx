import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#06c987" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="%PUBLIC_URL%/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="%PUBLIC_URL%/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="%PUBLIC_URL%/favicon-16x16.png"
          />
          <link rel="manifest" href="%PUBLIC_URL%/site.webmanifest" />
          <link
            rel="mask-icon"
            href="%PUBLIC_URL%/safari-pinned-tab.svg"
            color="#06c987"
          />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

          <script src="https://cdn.jsdelivr.net/npm/semantic-ui-calendar-react@latest/dist/umd/semantic-ui-calendar-react.js"></script>
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      // useful for wrapping the whole react tree
      enhanceApp: (App) => App,
      // useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
  
};