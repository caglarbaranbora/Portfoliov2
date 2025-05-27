import Link from "next/link";

interface ButtonProps {
  path: string;
  title: string;
  style?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <div>
      <Link href={props.path} className={`bg-gray-100 p-4 ${props.style}`}>
        {props.title}
      </Link>
    </div>
  );
}
