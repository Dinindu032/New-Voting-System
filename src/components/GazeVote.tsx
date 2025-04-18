import { useEffect, useRef, useState } from "react";

interface GazeVoteProps {
  onVote: (choice: string) => void;
}

const GazeVote = ({ onVote }: GazeVoteProps) => {
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let lookTimer: NodeJS.Timeout | null = null;

    const checkGaze = (data: any) => {
      if (!data) return;

      const x = data.x;
      const y = data.y;

      const yesBtn = yesRef.current?.getBoundingClientRect();
      const noBtn = noRef.current?.getBoundingClientRect();

      if (yesBtn && x >= yesBtn.left && x <= yesBtn.right && y >= yesBtn.top && y <= yesBtn.bottom) {
        if (!lookTimer) {
          lookTimer = setTimeout(() => {
            setSelected("Yes");
            onVote("Yes");
          }, 2000);
        }
      } else if (noBtn && x >= noBtn.left && x <= noBtn.right && y >= noBtn.top && y <= noBtn.bottom) {
        if (!lookTimer) {
          lookTimer = setTimeout(() => {
            setSelected("No");
            onVote("No");
          }, 2000);
        }
      } else {
        if (lookTimer) {
          clearTimeout(lookTimer);
          lookTimer = null;
        }
      }
    };

    window.webgazer.setGazeListener(checkGaze).begin();
    window.webgazer.showPredictionPoints(true);

    return () => {
      window.webgazer.removeGazeListener(checkGaze);
      window.webgazer.end();
    };
  }, [onVote]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {/* <h2>Look at a button to vote 👁️</h2> */}
      <button ref={yesRef} style={{ fontSize: "1.5rem", margin: "1rem", padding: "1rem" }}>
        {/* ✅ Yes */}
      </button>
      <button ref={noRef} style={{ fontSize: "1.5rem", margin: "1rem", padding: "1rem" }}>
        {/* ❌ No */}
      </button>
      {selected && <p>You voted: <strong>{selected}</strong></p>}
    </div>
  );
};

export default GazeVote;
