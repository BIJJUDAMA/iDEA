import { useEffect, useState } from "react";
import { Landing } from "./pages";
import BlogEndpoint from "./pages/BlogEndpoint";

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = route.startsWith("#/blogs")
      ? "Blogs — iDEA"
      : "iDEA — Ideas brought to life";
  }, [route]);

  if (route.startsWith("#/blogs")) return <BlogEndpoint />;
  if (route === "#/" || route === "#") return <Landing />;

  return (
    <main className="not-found">
      <p>404</p>
      <h1>Page not found</h1>
      <a href="#/">Return to iDEA</a>
    </main>
  );
}
