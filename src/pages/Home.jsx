"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FetchInterviews from "../helpers/FetchinterviewHistory";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "../components/CVDocument";

const cvData = {
  name: "Omar Alaa",
  title: "Software Engineer",
  phone: "+1(20) 1140019178",
  email: "omar.alaa.elhammay@gmail.com",
  linkedin: "linkedin profile",
  github: "Github account",

  education: [
    {
      institution: "Faculty of Computer Science Ain shams university",
      gpa: "3.61",
      period: "Oct 2021 - present",
    },
  ],

  projects: [
    {
      name: "Full-stack chatting App",
      components: [
        {
          title: "Backend",
          description:
            "The API is built using the Express.js framework, providing secure and scalable endpoints for user authentication, message handling, and real-time communication through WebSocket protocols using Socket.io. It handles all server-side logic, including data storage and retrieval using a MongoDB.",
        },
        {
          title: "Frontend",
          description:
            "The front end is developed using React, offering a responsive and interactive UI for users to send and receive messages in real time. The application uses WebSocket for seamless real-time updates and state management with React's component-based architecture",
        },
      ],
    },
    {
      name: "Social Media API",
      components: [
        {
          title: "",
          description:
            "The project is a RESTful API for a social media platform built using the Express.js framework. The API provides essential features like user authentication, post creation, and interaction mechanisms such as likes and comments. It incorporates pagination to efficiently handle large datasets, ensuring smooth navigation through posts and comments. The API is designed to support core social media functionalities, enabling users to engage with content dynamically while maintaining scalability and performance.",
        },
      ],
    },
    {
      name: "Uber system",
      components: [
        {
          title: "",
          description:
            "Developed an Uber-like application in Java, incorporating SOLID principles and design patterns. Features include a graph-based map system for route optimization using Dijkstra's algorithm, ride request functionality, and status updates for passengers and drivers. Enhanced user experience with a scalable solution and a graphical interface created using SceneBuilder.",
        },
      ],
    },
  ],

  achievements: [
    {
      title: "Egyptian Collegiate Programming Contest (ECPC) 2024",
      description:
        "Ranked 67th among over 400 teams from all over Egypt, ranked 8th among the brilliant minds in our Faculty of Computer and Information Sciences at Ain Shams University, showcasing advanced algorithmic thinking and teamwork.",
    },
  ],

  skills: [
    {
      category: "Programming Languages",
      items: ["HTML", "CSS", "JavaScript", "C", "C++", "Java", "Python"],
    },
    {
      category: "Frameworks",
      items: ["React", "Express.js"],
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL"],
    },
    {
      category: "Data Structures and Algorithms",
      items: [],
    },
    {
      category: "Object-Oriented Programming (OOP)",
      items: [],
    },
    {
      category: "Problem Solving",
      items: [],
    },
  ],
}

const Home = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("cvs");
  const [cvs, setCvs] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    setCvs([
      { id: 1, title: "Software Engineer CV", createdAt: "2023-05-15" },
      { id: 2, title: "Product Manager CV", createdAt: "2023-06-20" },
    ]);

    // setInterviews([
    //   { id: 1, role: "Frontend Developer", company: "Tech Co", date: "2023-07-10", status: "completed", score: 85 },
    //   { id: 2, role: "Backend Engineer", company: "Startup Inc", date: "2023-07-15", status: "completed", score: 92 },
    // ])

    FetchInterviews(setInterviews);
  }, [activeTab]);

  return (
    <div className="py-8">
      <div className="mb-10 bg-gradient-header p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-3 text-gradient">
          Welcome, {currentUser.name || currentUser.email.split("@")[0]}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Prepare for your next career opportunity with our AI-powered tools.
          Create professional CVs and practice with mock interviews.
        </p>
      </div>

      <div className="flex flex-wrap space-x-1 mb-8 bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          className={`px-5 py-2.5 font-medium rounded-md transition-all duration-200 ${
            activeTab === "cvs"
              ? "bg-white text-teal-700 shadow-sm"
              : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("cvs")}
        >
          My CVs
        </button>
        <button
          className={`px-5 py-2.5 font-medium rounded-md transition-all duration-200 ${
            activeTab === "interviews"
              ? "bg-white text-teal-700 shadow-sm"
              : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("interviews")}
        >
          My Interviews
        </button>
      </div>

      {activeTab === "cvs" ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Your CVs</h2>
            {/* <button className="btn-primary rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New CV
            </button> */}
            <Link to="/cv" className="btn-primary">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Start New CV
            </Link>
          </div>

          {cvs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <div key={cv.id} className="card group">
                  <div className="mb-4 bg-teal-50 rounded-lg p-4 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cv.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Created on {cv.createdAt}
                  </p>
                  <div className="flex space-x-2">
                    <button className="btn-outline text-sm flex-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button className="btn-outline text-sm flex-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>
                    <PDFDownloadLink
                      document={<CVDocument data={cvData} />}
                      fileName="cv.pdf"
                    >
                      Download CV
                    </PDFDownloadLink>
                  </div>
                </div>
              ))}

              {/* Add CV card */}
              <div className="card border-dashed border-2 border-gray-200 flex flex-col items-center justify-center hover:border-teal-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                  Create New CV
                </h3>
                <p className="text-gray-500 text-sm text-center mt-2">
                  Build a professional CV with our AI-powered tools
                </p>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="w-20 h-20 mx-auto bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mb-6 text-lg">
                You haven't created any CVs yet.
              </p>
              <button className="btn-primary mx-auto">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Your First CV
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Your Interviews</h2>
            <Link to="/pre-interview" className="btn-primary">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Start New Interview
            </Link>
          </div>

          {interviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {interview.role}
                      </h3>
                      {/* <p className="text-gray-600 mb-2">{interview.company}</p> */}
                      <p className="text-gray-500 text-sm">
                        Interviewed on {interview.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`text-xl font-bold mb-2 ${
                          interview.score >= 90
                            ? "text-green-600"
                            : interview.score >= 70
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {interview.score}%
                      </div>
                      {/* <span className="badge badge-success">{interview.status}</span> */}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <Link
                      to={`/interview-details/${interview.id}`}
                      className="text-teal-600 hover:text-teal-800 font-medium flex items-center"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Start interview card */}
              <div className="card border-dashed border-2 border-gray-200 flex flex-col items-center justify-center hover:border-teal-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                  Start New Interview
                </h3>
                <p className="text-gray-500 text-sm text-center mt-2">
                  Practice with our AI-powered mock interviews
                </p>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="w-20 h-20 mx-auto bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mb-6 text-lg">
                You haven't done any mock interviews yet.
              </p>
              <Link to="/pre-interview" className="btn-primary mx-auto">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Start Your First Interview
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
