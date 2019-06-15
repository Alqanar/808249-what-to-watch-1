import * as React from "react";


interface IProps {
  needVanish?: boolean;
  children: React.ReactElement;
  className?: string;
}

const ShakyWrapper: React.FC<IProps> = (props): React.ReactElement => {
  const {needVanish, children, className} = props;

  return (
    needVanish ? (
      <>
        {children}
      </>
    ) : (
      <div className={className}>
        {children}
      </div>
    )
  );
};

export default ShakyWrapper;
