'use client';
import css from "../../components/Error/Error.module.css";

type Props = { error: Error; };

const Error = ({ error }: Props) => {
  return (<p className={css.text}>Could not fetch the list of notes. {error.message}</p>);
}
export default Error;