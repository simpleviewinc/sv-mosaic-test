import { Link } from "react-router-dom";

export default function Home() {
  return (
    <ul>
      <li>
        <Link to="/buttons/">Buttons</Link>
      </li>
      <li>
        <Link to="/dataview/">DataView</Link>
      </li>
      <li>
        <Link to="/form/">Form</Link>
      </li>
      <li>
        <Link to="/form_prefill/">Form Prefill</Link>
      </li>
      <li>
        <Link to="/summary/">Summary</Link>
      </li>
    </ul>
  );
}
