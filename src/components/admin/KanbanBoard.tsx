'use client'

import { useState } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Column } from './KanbanColumn'
import { Card } from './KanbanCard'
import { updateConsultationStatus } from '@/app/admin/actions'
import { toast } from 'sonner'
import { ConsultationDetail } from './ConsultationDetail'

export type Consultation = {
    id: string
    name: string
    contact: string
    phone: string
    message: string
    status: string
    created_at: string
    memo?: string
}

type KanbanBoardProps = {
    initialData: Consultation[]
}

export function KanbanBoard({ initialData }: KanbanBoardProps) {
    const [items, setItems] = useState<Consultation[]>(initialData)
    const [activeId, setActiveId] = useState<string | null>(null)
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const columns = ['new', 'contacted', 'closed']

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeId = active.id as string
        const overId = over.id as string

        // Find the item
        const activeItem = items.find((item) => item.id === activeId)
        if (!activeItem) {
            setActiveId(null)
            return
        }

        // Determine new status
        let newStatus = activeItem.status
        if (columns.includes(overId)) {
            // Dropped directly on a column
            newStatus = overId
        } else {
            // Dropped on another card, find that card's status
            const overItem = items.find((item) => item.id === overId)
            if (overItem) {
                newStatus = overItem.status
            }
        }

        if (activeItem.status !== newStatus) {
            // Optimistic update
            setItems((prev) =>
                prev.map((item) =>
                    item.id === activeId ? { ...item, status: newStatus } : item
                )
            )

            // Supabase update using server action for logging
            const result = await updateConsultationStatus(activeId, newStatus)

            if (result.error) {
                toast.error('Failed to update status')
                // Revert on error
                setItems((prev) =>
                    prev.map((item) =>
                        item.id === activeId ? { ...item, status: activeItem.status } : item
                    )
                )
            } else {
                toast.success(`Moved to ${newStatus}`)
            }
        }

        setActiveId(null)
    }

    const handleCardClick = (item: Consultation) => {
        setSelectedConsultation(item)
        setIsDetailOpen(true)
    }

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex h-full gap-4 overflow-x-auto pb-4">
                    {columns.map((status) => (
                        <Column key={status} id={status} title={status.charAt(0).toUpperCase() + status.slice(1)} count={items.filter(i => i.status === status).length}>
                            {items
                                .filter((item) => item.status === status)
                                .map((item) => (
                                    <div key={item.id} onClick={() => handleCardClick(item)}>
                                        <Card item={item} />
                                    </div>
                                ))}
                        </Column>
                    ))}
                </div>
                <DragOverlay>
                    {activeId ? (
                        <Card item={items.find((i) => i.id === activeId)!} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <ConsultationDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                consultation={selectedConsultation}
            />
        </>
    )
}
