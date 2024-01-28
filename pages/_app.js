import Head from "next/head";
import "@/styles/Globals.css";
import "@/styles/Calculator.css";
import "@/styles/Guide.css";
import "@/styles/Field.css";
import "@/styles/Member.css";


const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta property="og:url" content="https://9terme.ir" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="9 ترمه" />
                <meta property="og:description" content="9 ترمه قراره بهت کمک کنه متوجه اوضاع نمره‌هات توی دانشگاه بشی" />
                <meta property="og:image" content="https://i.postimg.cc/qvB91Jc0/preview.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <link rel="icon" href="/favicon.png" />
                <title>9 ترمه</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};


export default App;