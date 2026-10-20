import { ProjectsIndexPage, projectsIndexMetadata } from "@/components/pages/ProjectsPages"

export const metadata = projectsIndexMetadata("ko")

export default function Page() {
  return <ProjectsIndexPage locale="ko" />
}
