import LandingPage from "./pages/landing/LandingPage";
import ThemeProvider from "./providers/ThemeProvider";
import AppErrorBoundary from "./components/AppErrorBoundary";

export default function App() {
  return (
    <ThemeProvider>
      <AppErrorBoundary>
        <LandingPage />
      </AppErrorBoundary>
    </ThemeProvider>
  );
}
