import { labelPresets, presetKey } from "../../utils/constants";

interface Props {
  name: string;
  color: string;
}

export default function LabelItem({ name, color }: Props) {
  return (
    <li
      className={`${
        labelPresets[color as presetKey]
      } text-white px-3 py-1 rounded-full cursor-pointer `}
    >
      {name}
    </li>
  );
}
