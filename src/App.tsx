import LandingPage from "./pages/landing/LandingPage";
import ThemeProvider from "./providers/ThemeProvider";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { LazyMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

const loadMotionFeatures = () =>
  import("./motionFeatures").then(({ default: features }) => features);

export default function App() {
  return (
    <ThemeProvider>
      <AppErrorBoundary>
        <ReactLenis root>
          <LazyMotion features={loadMotionFeatures} strict>
            <LandingPage />
          </LazyMotion>
        </ReactLenis>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}
