interface Props {
  children: JSX.Element;
}

function Error({ children }: Props) {
  return <div className="m-4 border-2 border-red-600 p-4">{children}</div>;
}

export default Error;
