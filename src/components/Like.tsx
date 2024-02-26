import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
interface Props {
  onClick: () => void;
  size: number;
}
function Like({ onClick, size }: Props) {
  const [liked, setLiked] = useState(false);
  const toggle = () => {
    setLiked(!liked);
    onClick();
  };
  return liked ? (
    <FaHeart onClick={toggle} color="red" size={size} />
  ) : (
    <FaRegHeart onClick={toggle} size={size} />
  );
}
export default Like;
