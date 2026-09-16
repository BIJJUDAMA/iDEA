import LandingPage from "./pages/landing/LandingPage";
import ThemeProvider from "./providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}
