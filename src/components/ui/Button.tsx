import Link from "next/link";

export default function Button(props) {
  return (
    <div>
      <Link href={props.path} className="bg-gray-100 p-4">
        {props.title}
      </Link>
    </div>
  );
}
