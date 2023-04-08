import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseLine from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme} from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  
  const theme = createTheme({
    
  })
  
  return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseLine />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
  );
}
