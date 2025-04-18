"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import FetchInterviews from "../helpers/FetchinterviewHistory"

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    // setTimeout(() => {
    //   setInterviews([
    //     {
    //       id: 1,
    //       role: "Frontend Developer",
    //       company: "Tech Co",
    //       date: "2023-07-10",
    //       status: "completed",
    //       score: 85,
    //       feedback: "Good technical knowledge, could improve communication",
    //     },
    //     {
    //       id: 2,
    //       role: "Backend Engineer",
    //       company: "Startup Inc",
    //       date: "2023-07-15",
    //       status: "completed",
    //       score: 92,
    //       feedback: "Excellent problem-solving skills, very thorough answers",
    //     },
    //     {
    //       id: 3,
    //       role: "Full Stack Developer",
    //       company: "Enterprise Corp",
    //       date: "2023-07-20",
    //       status: "completed",
    //       score: 78,
    //       feedback: "Good overall, needs more depth on system design questions",
    //     },
    //   ])
    //   setLoading(false)
    // }, 1000)
    FetchInterviews(setInterviews,setLoading)
  }, [])

  const filteredInterviews =
    filter === "all"
      ? interviews
      : interviews.filter((interview) => {
          if (filter === "high") return interview.score >= 90
          if (filter === "medium") return interview.score >= 70 && interview.score < 90
          if (filter === "low") return interview.score < 70
          return true
        })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interview History</h1>
        <Link to="/pre-interview" className="btn-primary rounded-2xl">
          Start New Interview
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-md ${filter === "high" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("high")}
          >
            High Score (90+)
          </button>
          <button
            className={`px-3 py-1 rounded-md ${filter === "medium" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("medium")}
          >
            Medium Score (70-89)
          </button>
          <button
            className={`px-3 py-1 rounded-md ${filter === "low" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("low")}
          >
            Low Score (&lt;70)
          </button>
        </div>
      </div>

      {filteredInterviews.length > 0 ? (
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{interview.role}</h3>
                  {/* <p className="text-gray-600 mb-2">{interview.company}</p> */}
                  <p className="text-gray-500 text-sm">Interviewed on {interview.date}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold mb-1 ${
                      interview.score >= 90
                        ? "text-green-600"
                        : interview.score >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {interview.score}/100
                  </div>
                  {/* <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{interview.status}</span> */}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                {/* <h4 className="font-medium mb-2">Feedback Summary:</h4>
                <p className="text-gray-700">{interview.feedback}</p> */}
              </div>

              <div className="mt-4">
                <Link to={`/interview-details/${interview.id}`} className="text-green-600 hover:underline">
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-gray-500 mb-4">No interviews match your filter criteria.</p>
          <button className="btn-outline" onClick={() => setFilter("all")}>
            Show All Interviews
          </button>
        </div>
      )}
    </div>
  )
}

export default InterviewHistory
