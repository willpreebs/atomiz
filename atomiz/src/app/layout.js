import { Inter } from 'next/font/google'
import '../../dist/output.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'

import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Atomiz',
  description: 'Generate short URLs!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript/>
        <link href="../../dist/output.css" rel="stylesheet"></link>
      </head>
      <body>
        <MantineProvider defaultColorScheme='dark'>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
