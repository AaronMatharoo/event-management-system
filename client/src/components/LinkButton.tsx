import { Link } from "react-router-dom";

//resusable component for button with linking
const LinkButton = ({
  to,
  text,
  submit,
}: {
  to: string;
  text: string;
  submit?: boolean;
}) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className="bg-purple-700 py-3 md:w-1/2 w-2/3 rounded-md hover:bg-purple-500 text-center"
    >
      <Link to={to}>
        <p className="text-2xl text-white">{text}</p>
      </Link>
    </button>
  );
};

export default LinkButton;
