"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const InterviewDetails = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    // setTimeout(() => {
    //   setInterview({
    //     id: Number.parseInt(interviewId),
    //     role: "Frontend Developer",
    //     company: "Tech Co",
    //     date: "2023-07-10",
    //     duration: "28 minutes",
    //     score: 85,
    //     feedback: "Good technical knowledge, could improve communication",
    //     strengths: [
    //       "Strong understanding of React concepts",
    //       "Good problem-solving approach",
    //       "Clear explanation of previous projects",
    //     ],
    //     improvements: [
    //       "Could provide more specific examples",
    //       "Sometimes hesitant when answering system design questions",
    //       "Could improve explanation of complex algorithms",
    //     ],
    //     questions: [
    //       {
    //         question: "Can you explain the difference between let, const, and var in JavaScript?",
    //         answer:
    //           "Var is function-scoped while let and const are block-scoped. Const creates a variable that cannot be reassigned, while let allows reassignment. Var is hoisted to the top of its scope.",
    //         feedback: "Good technical explanation, covered all key differences",
    //       },
    //       {
    //         question: "How does React's virtual DOM work?",
    //         answer:
    //           "React creates a virtual representation of the UI in memory. When state changes, React creates a new virtual DOM tree, compares it with the previous one (diffing), and then only updates the real DOM with the necessary changes.",
    //         feedback: "Excellent explanation, demonstrated deep understanding",
    //       },
    //       {
    //         question: "Explain CSS specificity and how it affects styling.",
    //         answer:
    //           "CSS specificity determines which styles are applied when multiple rules target the same element. Inline styles have highest specificity, followed by IDs, then classes/attributes, and finally elements. More specific selectors override less specific ones.",
    //         feedback: "Good explanation of the concept, could have provided an example",
    //       },
    //       {
    //         question: "What are closures in JavaScript and how would you use them?",
    //         answer:
    //           "Closures are functions that remember the environment they were created in. They can access variables from their outer function even after that function has returned. They're useful for data privacy, creating factory functions, and maintaining state in callbacks.",
    //         feedback: "Very good explanation with practical use cases",
    //       },
    //       {
    //         question: "How would you optimize the performance of a React application?",
    //         answer:
    //           "I would use React.memo for component memoization, useCallback for function memoization, and useMemo for expensive calculations. I'd also implement code splitting with React.lazy, optimize rendering with virtualization for long lists, and ensure proper key usage in lists.",
    //         feedback: "Comprehensive answer covering multiple optimization techniques",
    //       },
    //     ],
    //   })
    //   setLoading(false)
    // }, 1500)
    async function FetchInterviewDetails() {
      try {
        console.log("interviewId", interviewId);
        const res = await fetch(
          `http://localhost:8080/interview/${interviewId}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          console.log("error fetching interview details");
          setLoading(false);
          return;
        }
        const data = await res.json();

        console.log(data);
        setInterview(data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    }

    FetchInterviewDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-2">Interview Not Found</h2>
        <p className="text-gray-600 mb-4">
          The interview you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/interview-history" className="btn-primary">
          Back to Interview History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/interview-history"
          className="text-indigo-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Interview History
        </Link>
        <h1 className="text-2xl font-bold">{interview.role} Interview</h1>
        <div className="flex flex-wrap gap-x-6 text-gray-600 mt-1">
          {/* <p>Company: {interview.company}</p> */}
          <p>Date: {interview.date}</p>
          {/* <p>Duration: {interview.duration}</p> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Overall Score</h2>
          <div
            className={`text-4xl font-bold ${
              interview.score >= 90
                ? "text-green-600"
                : interview.score >= 70
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {interview.score}/100
          </div>
        </div>

        {/* <div className="card md:col-span-2">
          <h2 className="text-xl font-bold mb-2">Summary Feedback</h2>
          <p className="text-gray-700">{interview.feedback}</p>
        </div> */}
      </div>

      {/* <div className="bg-black grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Strengths</h2>
          <ul className="space-y-2">
            {interview.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Areas for Improvement</h2>
          <ul className="space-y-2">
            {interview.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Question Analysis</h2>

        <div className="space-y-6">
          {interview.questions.map((item, index) => (
            <div
              key={index}
              className={
                index < interview.questions.length - 1
                  ? "pb-6 border-b border-gray-200"
                  : ""
              }
            >
              <h3 className="font-semibold text-lg mb-2">
                Q{index + 1}: {item.question}
              </h3>

              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Your Answer:
                </h4>
                <p className="text-gray-700">{item.answer}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Feedback:
                </h4>
                <p className="text-gray-700">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-outline">Download Report</button>
        <Link to="/pre-interview" className="btn-primary">
          Start New Interview
        </Link>
      </div>
    </div>
  );
};

export default InterviewDetails;
