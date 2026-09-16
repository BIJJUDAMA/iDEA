import { Component, type PropsWithChildren } from "react";
import { ButtonLink } from "./Button";

export default class AppErrorBoundary extends Component<
  PropsWithChildren,
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main>
          <h1>Something went wrong</h1>
          <p>Please reload the page to try again.</p>
          <ButtonLink href={import.meta.env.BASE_URL}>Reload iDEA</ButtonLink>
          <p>
            <a href="https://github.com/IDEA-Amrita">Visit iDEA on GitHub</a>
          </p>
        </main>
      );
    return this.props.children;
  }
}
