import React from "react";

export default function MissionStatus() {
  return (
    <div className="my-3">
      <p>
        <span className="px-3 mr-2 bg-warning" /> = Success
      </p>
      <p>
        <span className="px-3 mr-2 bg-danger" /> = Fail
      </p>
    </div>
  );
}
