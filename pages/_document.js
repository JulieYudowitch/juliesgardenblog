import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:image" content="./gardenssi.webp" />
          <meta
            property="og:url"
            content="https://https://vercelgardenblog.vercel.app/"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="645" />
          <meta property="og:image:alt" content="" />
          <meta property="og:type" content="website" />
          <meta name="description" content="Julie Yudowitch Garden Blog" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,300;0,400;0,700;1,300;1,400&family=Source+Sans+Pro:ital,wght@0,200;0,400;0,700;1,200;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal"></div>
        </body>
      </Html>
    );
}