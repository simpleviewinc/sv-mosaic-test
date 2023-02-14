import { Spinner as MosaicSpinner } from "@simpleview/sv-mosaic";
import { useState } from "react";

export default function Spinner() {
    const [progress, setProgress] = useState(0);

    return (
      <div>
        <div>
            <input
                value={progress}
                onChange={(event) => setProgress(parseInt(event.target.value) ?? 0)}
                type="range"
                min="0"
                max="100"
                step="1" />
            {progress}
        </div>
        <MosaicSpinner progress={progress} />
      </div>
    );
  }