import React from "react";

export default function TrimText({
  text,
  length = 50,
}: {
  text: string;
  length?: number;
}): React.ReactNode {
  return text.length > length ? `${text.slice(0, length)}...` : text;
}
