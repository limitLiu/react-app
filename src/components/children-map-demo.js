import React from "react";

export function ChildrenMapDemo(props) {
  const mapped = React.Children.map(props.children, child => [child, [child, child]]);
  console.log(mapped);
  return mapped;
}
