import React from "react";

export default function TrimText({
  text,
  length = 50,
}: {
  text: string | undefined;
  length?: number;
}): React.ReactNode {
  if (text) return text.length > length ? `${text.slice(0, length)}...` : text;
}
