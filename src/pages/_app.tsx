import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseLine from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme} from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  
  const theme = createTheme({
		palette: {
			primary: {
				main: "#02B4E2",
			},
			error: {
				main: "#FF6347",
			},
			info: {
				main: "#D9D9D9",
			},
		},
  });
  
  return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseLine />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
  );
}
