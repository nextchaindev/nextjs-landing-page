import { PROCESS_STEPS } from "@/content/process"

export default function ProcessList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PROCESS_STEPS.map((step, idx) => (
        <li key={step.title} className="relative bg-white border border-gray-200 rounded-2xl p-6">
          <span className="text-sm font-bold tracking-wider uppercase text-primary">
            Bước {idx + 1}
          </span>
          <h3 className="mt-2 text-lg font-bold text-gray-900">{step.title}</h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.desc}</p>
          {detailed && (
            <p className="mt-3 text-sm text-gray-800 leading-relaxed">{step.detail}</p>
          )}
        </li>
      ))}
    </ol>
  )
}
