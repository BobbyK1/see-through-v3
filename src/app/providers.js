'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { SideContentProvider } from './context/useSideContent'

export function Providers({ children }) {

    const config = {
        initialColorMode: 'dark',
        useSystemColorMode: false,
      }
    
    const theme = extendTheme({ config })

    return (
        <CacheProvider>
            <ChakraProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <SideContentProvider>
                    {children}
                </SideContentProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}