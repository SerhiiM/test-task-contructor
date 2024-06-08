import ReactDOM from "react-dom/client";
import { EditorStaticExample } from "./components";
import { Editor } from "./editor";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Editor />);
