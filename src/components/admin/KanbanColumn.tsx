'use client'

import { useDroppable } from '@dnd-kit/core'

type ColumnProps = {
    id: string
    title: string
    count: number
    children: React.ReactNode
}

export function Column({ id, title, count, children }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    })

    return (
        <div
            ref={setNodeRef}
            className="flex h-full w-80 min-w-[320px] flex-col rounded-lg bg-gray-100 p-4 shadow-sm"
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">{title}</h3>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {count}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
