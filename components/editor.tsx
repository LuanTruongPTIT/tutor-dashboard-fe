"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}
export const Editor = ({ value, onChange }: EditorProps) => {
  const ReactQuill = useMemo<React.ComponentType<any>>(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
};
