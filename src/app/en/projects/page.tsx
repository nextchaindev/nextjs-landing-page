import { ProjectsIndexPage, projectsIndexMetadata } from "@/components/pages/ProjectsPages"

export const metadata = projectsIndexMetadata("en")

export default function Page() {
  return <ProjectsIndexPage locale="en" />
}
