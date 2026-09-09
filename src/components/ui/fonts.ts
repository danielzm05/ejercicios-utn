import { Jersey_10, IBM_Plex_Mono } from 'next/font/google'
 
export const pixelFont1 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-pixel1'
})

export const plexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-mono'
})