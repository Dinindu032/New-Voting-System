// import { useEffect, useState } from 'react';

// export const VoiceCommand = ({ onCommand }: { onCommand: (text: string) => void }) => {
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser doesn't support Speech Recognition!");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.continuous = false;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onend = () => setIsListening(false);
//     recognition.onerror = (e: any) => console.error(e);

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       onCommand(transcript);
//     };

//     if (isListening) recognition.start();

//     return () => recognition.stop();
//   }, [isListening, onCommand]);

//   return (
//     <button
//       onClick={() => setIsListening((prev) => !prev)}
//       className="px-4 py-2 rounded-lg bg-amber-500 text-white font-bold shadow-lg"
//     >
//       {isListening ? "🎤 Listening..." : "🎙️ Start Voice Command"}
//     </button>
//   );
// };



import { useEffect, useState } from 'react';

interface VoiceCommandProps {
  onCommand: (text: string, electionId: string, isDisabledVote: boolean) => void;
  electionId: string;
  disabled: boolean;
}

export const VoiceCommand = ({ onCommand, electionId, disabled }: VoiceCommandProps) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => console.error(e);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      // Send the command with the transcript, electionId, and disabled flag
      onCommand(transcript, electionId, disabled);
    };

    if (isListening) recognition.start();

    return () => recognition.stop();
  }, [isListening, onCommand, electionId, disabled]);

  return (
    <button
      onClick={() => setIsListening((prev) => !prev)}
      className="px-4 py-2 rounded-lg bg-amber-500 text-white font-bold shadow-lg"
    >
      {isListening ? "🎤 Listening..." : "🎙️ Start Voice Command"}
    </button>
  );
};
