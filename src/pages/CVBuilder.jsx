import { TemplateSelection } from "../components/TemplateSelection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">CV Builder</h1>
          <p className="mt-2 text-muted-foreground">Create your professional CV in minutes</p>
        </div>
        {/* <TemplateSelection /> */}
      </div>
    </main>
  )
}
