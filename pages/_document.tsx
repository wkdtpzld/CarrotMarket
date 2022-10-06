import Document, { Head, Html, Main, NextScript} from "next/document";



class CustomDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head >
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument;