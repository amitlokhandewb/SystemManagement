import Appbar from "./Components/Appbar";
import "@fontsource/nunito-sans"; // Defaults to weight 400
import "@fontsource/nunito-sans/400.css"; // Specify weight
import "@fontsource/nunito-sans/400-italic.css"; // Specify weight and style



export default function Root(props) {
  return <section><Appbar /></section>;
}
