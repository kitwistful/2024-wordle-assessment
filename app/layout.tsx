export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
                <title>Wordle! The Magical Game</title>
            </head>
            <body>{children}</body>
        </html>
    );
}
