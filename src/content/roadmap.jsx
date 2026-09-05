import { useRef, useState } from "react";
import { Generic, Navbar, Roadmap } from "../subcomponents";
import useElementOnScreen from "../animations";
import data from "../data/roadmap.json";
import { Socials } from "../components";

const AboutPage = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const selectedItem = selectedIndex === null ? null : data[selectedIndex];

  const handleClick = (val) => {
    setSelectedIndex(Number(val));
    setIsPinned(true);
  };

  const handleCrossClick = () => {
    setIsPinned(false);
    setSelectedIndex(null);
  };

  const handleHover = (val) => {
    if (!isPinned) setSelectedIndex(Number(val));
  };

  const handleLeave = () => {
    if (!isPinned) setSelectedIndex(null);
  };

  const ref = useRef(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <>
      <Generic>
        <Navbar.TopContainer>
          <Navbar.TimelineBarLeft>
            <Navbar.Circle
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
              onClick={props.about}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              $size
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              ref={ref}
              style={{
                width: onScreen ? "1%" : "0",
                translate: onScreen ? "none" : "0 10rem",
                transition: "2000ms ease-in-out",
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.team}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.projects}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.contribute}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.alumni}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
          </Navbar.TimelineBarLeft>
          <Socials isLight={props.isLight} />
          {/* <Navbar.TopTitle>
            <AiOutlineArrowDown onClick={props.down} />
            <AiOutlineArrowUp onClick={props.up} />
          </Navbar.TopTitle> */}
        </Navbar.TopContainer>
        <Roadmap.MainContainer>
          <Generic.TopRightTitleContainer>
            <Generic.TopRightTitle
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "1000ms ease-in-out",
              }}
            >
              Roadmap
            </Generic.TopRightTitle>
            <Generic.TopRightMottoText
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "1000ms ease-in-out",
              }}
            >
              At iDEA, we believe in and thrive on, well defined
            </Generic.TopRightMottoText>
            <Generic.TopRightMottoText
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "1000ms ease-in-out",
                alignSelf: "flex-end",
              }}
            >
              goals
            </Generic.TopRightMottoText>
          </Generic.TopRightTitleContainer>
          <Roadmap.OnHoverContainer
            $visible={Boolean(selectedItem)}
            $backgroundColor={
              props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
            }
            $color={props.isLight ? "#fff" : "#000"}
            aria-live="polite"
          >
            {selectedItem && (
              <Roadmap.OnHoverImage
                src={
                  props.isLight ? selectedItem.image : selectedItem.image_alt
                }
                alt=""
              />
            )}
            <Roadmap.OnHoverInnerContainer>
              <Roadmap.OnHoverTitle>{selectedItem?.title}</Roadmap.OnHoverTitle>
              <Roadmap.OnHoverSubTitle>
                {[selectedItem?.location, selectedItem?.date]
                  .filter(Boolean)
                  .join(" ")}
              </Roadmap.OnHoverSubTitle>
              <Roadmap.OnHoverParagraph>
                {selectedItem?.content}
              </Roadmap.OnHoverParagraph>
              <Roadmap.CrossIcon
                type="button"
                aria-label="Close roadmap detail"
                $visible={isPinned}
                onClick={handleCrossClick}
              />
            </Roadmap.OnHoverInnerContainer>
          </Roadmap.OnHoverContainer>
          <Roadmap>
            <Roadmap.AngledBoxContainer
              onClick={(e) => {
                e.preventDefault();
                handleClick("4");
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleHover("4");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleLeave();
              }}
              className="roadmap-angled-box-container"
              $backgroundColor={
                props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
              }
              $color={props.isLight ? "#fff" : "#000"}
            >
              <Roadmap.TextDate>02-06-2023</Roadmap.TextDate>
              <Roadmap.TextTitle>INCEPTION</Roadmap.TextTitle>
            </Roadmap.AngledBoxContainer>
            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.Circle
              onClick={(e) => {
                e.preventDefault();
                handleClick("0");
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleHover("0");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleLeave();
              }}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 1,
              }}
            >
              {/* <Navbar.CircleText>02, June, 2022</Navbar.CircleText> */}
              <p
                style={{
                  position: "relative",
                  bottom: "100%",
                  display: "inline",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Now!
              </p>
            </Navbar.Circle>

            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.Circle
              onClick={(e) => {
                e.preventDefault();
                handleClick("1");
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleHover("1");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleLeave();
              }}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 1,
              }}
            >
              {/* <Navbar.CircleText>02, June, 2022</Navbar.CircleText> */}
              <p
                style={{
                  position: "relative",
                  bottom: "100%",
                  display: "inline",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Soon...
              </p>
            </Navbar.Circle>
            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.Circle
              onClick={(e) => {
                e.preventDefault();
                handleClick("2");
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleHover("2");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleLeave();
              }}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 1,
              }}
            >
              {/* <Navbar.CircleText>02, June, 2022</Navbar.CircleText> */}
              <p
                style={{
                  position: "relative",
                  bottom: "100%",
                  display: "inline",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Later?
              </p>
            </Navbar.Circle>
            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.LengthStick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 0.5,
              }}
            />
            <Navbar.Circle
              onClick={(e) => {
                e.preventDefault();
                handleClick("3");
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleHover("3");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleLeave();
              }}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
                opacity: 1,
              }}
            >
              {/* <Navbar.CircleText>02, June, 2022</Navbar.CircleText> */}
              <p
                style={{
                  position: "relative",
                  bottom: "100%",
                  display: "inline",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Futuristic!
              </p>
            </Navbar.Circle>
          </Roadmap>
        </Roadmap.MainContainer>
      </Generic>
    </>
  );
};

export default AboutPage;
