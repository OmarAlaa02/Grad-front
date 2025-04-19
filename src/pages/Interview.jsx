"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {listen,speek} from '../helpers/speechapi'
// Mock interview questions based on role
const mockQuestions = {
  frontend: [
    "Can you explain the difference between let, const, and var in JavaScript?",
    "How does React's virtual DOM work?",
    "Explain CSS specificity and how it affects styling.",
    "What are closures in JavaScript and how would you use them?",
    "How would you optimize the performance of a React application?",
  ],
  backend: [
    "Explain RESTful API design principles.",
    "How would you handle database transactions?",
    "Describe the differences between SQL and NoSQL databases.",
    "How do you implement authentication and authorization?",
    "Explain how you would scale a web application.",
  ],
  fullstack: [
    "How do you handle state management between frontend and backend?",
    "Explain your approach to designing a full-stack application architecture.",
    "How would you implement real-time features in a web application?",
    "Describe your experience with CI/CD pipelines.",
    "How do you ensure security in a full-stack application?",
  ],
  // Default questions if role is not specified
  default: [
    "Tell me about yourself and your experience.",
    "What are your strengths and weaknesses?",
    "Describe a challenging project you worked on.",
    "How do you stay updated with the latest technologies?",
    "Do you have any questions for me?",
  ],
}

const Interview = () => {
  const { role } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [currentInput, setCurrentInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [interviewComplete, setInterviewComplete] = useState(false)
  // const [loading, setLoading] = useState(true)
  const [interviewData, setInterviewData] = useState(null)
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  
  let interviewQuestions = useRef([]);
  let interviewID = useRef(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentlyInterviewing, setCurrentlyInterviewing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [isListening, setIsListening] = useState(false);
  // Mock fetch interview data
  useEffect(() => {
    // In a real app, this would fetch from an API
    // setTimeout(() => {
    //   const data = {
    //     id,
    //     role: "frontend", // This would come from the pre-interview selection
    //     company: "Tech Company",
    //     experienceLevel: "mid",
    //     date: new Date().toISOString(),
    //   }
    //   setInterviewData(data)
    //   setLoading(false)

    //   // Add initial greeting
    //   setMessages([
    //     {
    //       id: 1,
    //       sender: "ai",
    //       text: `Hello! I'll be conducting your mock interview for a ${id} position today. I'll ask you a series of questions, and you can respond either by speaking or typing. Are you ready to begin?`,
    //     },
    //   ])
    // }, 1500)

    async function FetchInterviewQuestions()
    {
      try {
        const res = await fetch(
          `http://localhost:8080/question?role=${role}&duration=quick`,
          {
            credentials: "include",
          }
        );

        const { interviewId, questions } = await res.json();

        // console.log("interviewId ",interviewId);
        console.log(questions);

        interviewQuestions.current = questions;
        interviewID.current = interviewId;

        setAskedQuestions([questions[0][0]]);
        setIsLoading(false);
        speek(questions[0][0].question, () => {
          listen(setAnswer, setIsListening);
        });

      } catch (err) {
        console.log("error occured ", err);
      }
    }

    FetchInterviewQuestions();
  }, [])

  function getNextQuestion() {
    // adaptive
    if (
      questionIndex ===
      interviewQuestions.current[difficultyIndex].length - 1
    ) {
      if (difficultyIndex == interviewQuestions.current.length - 1) {
        setCurrentlyInterviewing(false);
      } else {
        setDifficultyIndex(difficultyIndex + 1);
        setQuestionIndex(0);
        setAskedQuestions((prev) => [
          ...prev,
          interviewQuestions.current[difficultyIndex + 1][0],
        ]);
        const question =
          interviewQuestions.current[difficultyIndex + 1][0].question;
        speek(question, () => {
          listen(setAnswer, setIsListening);
        });
      }

      return;
    }
    // console.log(interviewQuestions);
    const question =
      interviewQuestions.current[difficultyIndex][questionIndex + 1]?.question;
    speek(question, () => {
      listen(setAnswer, setIsListening);
    });
    setAskedQuestions((prev) => [
      ...prev,
      interviewQuestions.current[difficultyIndex][questionIndex + 1],
    ]);
    // console.log(
    //   "asked question ",
    //   interviewQuestions.current[questionIndex + 1]
    // );
    // console.log("questionIndex ", questionIndex);
    setQuestionIndex(questionIndex + 1);
  }

  async function sendToModel(data)
  {
    try {
      const res = await fetch("http://localhost:8080/interview/answer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log("error occured", err);
    }
  }

  async function handleSubmit() {
    // e.preventDefault();
    // console.log("answer sent");
    // console.log();
    // const currentQuestionIndex = questionIndex * 2;
    console.log(interviewQuestions.current[difficultyIndex][questionIndex]?.id);
    // console.log("askedQuestions ",askedQuestions);
    // return;
    let data = {
      interviewId: interviewID.current,
      qId: interviewQuestions.current[difficultyIndex][questionIndex]?.id,
      answer,
    };
    // setIsLoading(true);
    sendToModel(data);

    // setIsLoading(false);

    // to add answer to chat stream
    setAskedQuestions((prev) => [
      ...prev,
      { question: answer, id: new Date().getTime() },
    ]);

    getNextQuestion();
    setAnswer("");
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [askedQuestions])

  // const toggleListening = () => {
  //   if (isListening) {
  //     recognitionRef.current.stop()
  //   } else {
  //     recognitionRef.current.start()
  //   }
  //   setIsListening(!isListening)
  // }

  // const handleSendMessage = () => {
  //   if (currentInput.trim() === "") return

  //   // Add user message
  //   const newMessages = [...messages, { id: Date.now(), sender: "user", text: currentInput }]
  //   setMessages(newMessages)
  //   setCurrentInput("")

  //   // Stop listening if active
  //   if (isListening) {
  //     recognitionRef.current.stop()
  //     setIsListening(false)
  //   }

  //   // Simulate AI thinking
  //   setTimeout(() => {
  //     if (currentQuestion < mockQuestions[interviewData?.role || "default"].length) {
  //       // Add AI response with next question
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           id: Date.now(),
  //           sender: "ai",
  //           text: mockQuestions[interviewData?.role || "default"][currentQuestion],
  //         },
  //       ])
  //       setCurrentQuestion((prev) => prev + 1)
  //     } else {
  //       // Interview complete
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           id: Date.now(),
  //           sender: "ai",
  //           text: "Thank you for completing this mock interview! I'll now analyze your responses and provide feedback. You can view the results in your interview history once the analysis is complete.",
  //         },
  //       ])
  //       setInterviewComplete(true)
  //     }
  //   }, 1000)
  // }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparing your interview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-indigo-700 to-indigo-900 text-transparent bg-clip-text">
              Mock Interview: {role} Position
            </h1>
            {/* {interviewData?.company && <p className="text-gray-600">Company: {interviewData.company}</p>} */}
          </div>
          <button
            onClick={() => navigate("/interview-history")}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit
          </button>
        </div>
      </div>

      <div className="card mb-6 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 p-4">
          {askedQuestions.map((message,index) => (
            <div key={message.id} className={`mb-6 ${index % 2 ===0  ? "pr-12" : "pl-12"}`}>
              <div
                className={`p-4 rounded-2xl ${index % 2 == 0 ? "message-bubble-ai" : "message-bubble-user"}`}
              >
                {message.question}
              </div>
              <div className={`text-xs mt-1 text-gray-500 ${index % 2 ===0  ? "text-left" : "text-right"}`}>
                {index % 2 ===0  ? "AI Interviewer" : "You"}
              </div>
            </div>
          ))}
          {/* {askedQuestions.map((question, index) => {
            return (
              <div
                key={question?.id}
                className={`message ${
                  index % 2 === 0 ? "message-bubble-ai" : "message-bubble-user"
                }`}
              >
                <div className="message-content">{question?.question}</div>
              </div>
            );
            // return <h1 key={question?.id}>{question?.question}</h1>;
          })} */}
          <div ref={messagesEndRef} />
        </div>

        {currentlyInterviewing && (
          <div className="border-t pt-4 px-4">
            <div className="flex items-center">
              <button
                // onClick={toggleListening}
                className={`p-3 rounded-full mr-3 transition-colors ${
                  isListening ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title={isListening ? "Stop recording" : "Start recording"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer or click the microphone to speak..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={2}
              />

              <button
                onClick={handleSubmit}
                disabled={answer.trim() === ""}
                className="p-3 ml-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full disabled:opacity-50 hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            {isListening && (
              <div className="text-sm text-gray-500 mt-2 flex items-center">
                <span className="inline-block h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Listening... Speak your answer
              </div>
            )}
          </div>
        )}
      </div>

      {!currentlyInterviewing && (
        <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Interview Complete!</h3>
            <p className="text-green-700 mb-6">
              Thank you for completing the mock interview. Your responses are being analyzed.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => navigate(`/interview-details/${interview}`)} className="btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                View Results
              </button>
              <button onClick={() => navigate("/")} className="btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Interview
