import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import useElementOnScreen from "./useElementOnScreen";

const originalObserver = globalThis.IntersectionObserver;
afterEach(() => {
  vi.stubGlobal("IntersectionObserver", originalObserver);
});

function Reveal({ name }) {
  const ref = useRef(null);
  const visible = useElementOnScreen(ref);
  return (
    <p ref={ref} data-reveal={visible ? "visible" : "hidden"}>
      {name}
    </p>
  );
}

describe("one-time reveals", () => {
  it("reveals independently and stops observing after activation", () => {
    const observers = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback) {
          this.callback = callback;
          this.disconnect = vi.fn();
          observers.push(this);
        }
        observe() {}
      },
    );
    render(
      <>
        <Reveal name="first" />
        <Reveal name="second" />
      </>,
    );
    expect(screen.getByText("first")).toHaveAttribute("data-reveal", "hidden");
    act(() => observers[0].callback([{ isIntersecting: true }]));
    expect(screen.getByText("first")).toHaveAttribute("data-reveal", "visible");
    expect(screen.getByText("second")).toHaveAttribute("data-reveal", "hidden");
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(screen.getByText("first")).toHaveAttribute("data-reveal", "visible");
  });

  it("keeps content visible without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Reveal name="fallback" />);
    expect(screen.getByText("fallback")).toHaveAttribute(
      "data-reveal",
      "visible",
    );
  });
});
