import { Html, Head, Main, NextScript } from "next/document";


const Document = () => {
    return (
        <Html dir="rtl" lang="fa-IR">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};


export default Document;