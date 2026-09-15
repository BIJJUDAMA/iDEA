import {
  Container,
  Image,
  InnerContainer,
  Paragraph,
  ParagraphContainer,
  Title,
  TopRightMottoText,
  TopRightTitle,
  TopRightTitleContainer,
} from "./styles/page";

const Page = Object.assign(Container, {
  Title,
  ParagraphContainer,
  Paragraph,
  Image,
  TopRightTitle,
  TopRightTitleContainer,
  TopRightMottoText,
  InnerContainer,
});

export default Page;
