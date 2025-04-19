"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean, professional design with a sidebar for skills and contact information.",
    image: "/placeholder.svg?height=300&width=220",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A simple, elegant design focusing on content with minimal styling.",
    image: "/placeholder.svg?height=300&width=220",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold design with accent colors and creative layout for creative professionals.",
    image: "/placeholder.svg?height=300&width=220",
  },
]
export function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Choose a Template</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`relative cursor-pointer overflow-hidden p-4 transition-all hover:shadow-md ${
              selectedTemplate === template.id ? "ring-2 ring-primary-600" : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* {selectedTemplate === template.id && (
              <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">
                <Check className="h-4 w-4" />
              </div>
            )} */}
            <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
              <img
                src={template.image || "/placeholder.svg"}
                alt={`${template.name} template preview`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={()=>navigate(`/CV/${selectedTemplate}`)} className="flex items-center gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
