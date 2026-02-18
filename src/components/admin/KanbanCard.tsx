'use client'

import { useDraggable } from '@dnd-kit/core'
import { Consultation } from './KanbanBoard'
import { CSS } from '@dnd-kit/utilities'

type CardProps = {
    item: Consultation
    isOverlay?: boolean
}

export function Card({ item, isOverlay }: CardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: item.id,
        })

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`relative flex cursor-grab flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${isDragging ? 'opacity-50 ring-2 ring-indigo-500' : ''
                } ${isOverlay ? 'cursor-grabbing shadow-xl ring-2 ring-indigo-500' : ''}`}
        >
            <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <span className="text-xs text-gray-400" suppressHydrationWarning>
                    {new Date(item.created_at).toLocaleDateString('vi-VN')}
                </span>
            </div>
            <div className="text-sm text-gray-600 truncate">{item.contact}</div>
            <div className="text-sm text-gray-600 truncate">{item.phone}</div>
            {item.message && (
                <p className="mt-1 line-clamp-3 text-xs text-gray-500">
                    {item.message}
                </p>
            )}
        </div>
    )
}
