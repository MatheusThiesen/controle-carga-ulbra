import { cloneElement, ReactElement } from "react";
import { Link, LinkProps, useHref } from "react-router-dom";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const asPath = useHref({});
  let isActive = false;

  if (shouldMatchExactHref && asPath === rest.to) {
    isActive = true;
  }

  if (!shouldMatchExactHref && asPath.startsWith(String(rest.to))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "white" : "gray.100",
        fontWeight: isActive ? "bold" : "light",
        transition: "color 0.3s",
      })}
    </Link>
  );
}
