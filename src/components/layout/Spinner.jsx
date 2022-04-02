import React from "react";
import spinner from "./assets/spinner.gif";

export default function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="LOADING..."
        width={180}
        className="text-center mx-auto"
      />
    </div>
  );
}
