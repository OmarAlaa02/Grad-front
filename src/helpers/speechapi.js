function speek(question, cb) {
  return;
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "en-US"; // Change language if needed
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      cb();
    };
  } else {
    alert("Your browser does not support Text-to-Speech.");
  }
}

let recognition;

function listen(setAnswer, setIsListening) {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false; // Stop after one sentence
  recognition.interimResults = true; // Only final results

  // setIsListening(true);

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setAnswer(transcript);
  };

  // 🔹 Stop listening automatically when the user stops speaking
  recognition.onspeechend = () => {
    console.log("Speech ended, stopping recognition...");
    recognition.stop();
    // setIsListening(false);
  };

  recognition.onend = () => {
    console.log("Recognition ended.");
    setIsListening(false);
    // setIsListening(false);
  };

  recognition.start();
  setIsListening(true);
}

export { speek, listen };
