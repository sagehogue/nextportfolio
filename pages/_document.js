import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }

    // Step 2: Retrieve styles from components in the page
    // const page = renderPage(
    //   (App) => (props) => sheet.collectStyles(<App {...props} />)
    // );

    // const initialProps = await Document.getInitialProps(renderPage);

    // // Step 3: Extract the styles as <style> tags
    // const styleTags = sheet.getStyleElement();

    // // Step 4: Pass styleTags as a prop
    // return { ...initialProps, ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Sage Hogue's Web Developer Portfolio Website"
          />
          <link rel="icon" href="/favicon.ico" />

          {this.props.styleTags}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
