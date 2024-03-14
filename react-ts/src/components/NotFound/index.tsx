interface Props {
  message: string;
}

function NotFound({ message }: Props) {
  return <div className="m-4 border-2 border-sky-600 p-4">{message}</div>;
}

export default NotFound;
