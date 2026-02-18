'use client'

import { useState, useEffect } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createClient } from '@/utils/supabase/client'
import { updateConsultationMemo } from '@/app/admin/actions'
import { toast } from 'sonner'
import { Consultation } from './KanbanBoard'

// Define Log type based on our table
type Log = {
    id: string
    actor_email: string
    action: string
    details: any
    created_at: string
}

type ConsultationDetailProps = {
    isOpen: boolean
    onClose: () => void
    consultation: Consultation | null
}

export function ConsultationDetail({ isOpen, onClose, consultation }: ConsultationDetailProps) {
    const [memo, setMemo] = useState('')
    const [logs, setLogs] = useState<Log[]>([])
    const [isLoadingLogs, setIsLoadingLogs] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        if (consultation) {
            setMemo(consultation.memo || '')
            fetchLogs(consultation.id)
        }
    }, [consultation])

    async function fetchLogs(id: string) {
        setIsLoadingLogs(true)
        const { data, error } = await supabase
            .from('consultation_logs')
            .select('*')
            .eq('consultation_id', id)
            .order('created_at', { ascending: false })

        if (!error && data) {
            setLogs(data)
        }
        setIsLoadingLogs(false)
    }

    async function handleSaveMemo() {
        if (!consultation) return

        const result = await updateConsultationMemo(consultation.id, memo)
        if (result.success) {
            toast.success('Memo updated')
            fetchLogs(consultation.id) // Refresh logs to show the update
        } else {
            toast.error('Failed to update memo')
        }
    }

    if (!consultation) return null

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle>{consultation.name}</SheetTitle>
                    <SheetDescription suppressHydrationWarning>
                        Created at {new Date(consultation.created_at).toLocaleString('vi-VN')}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 space-y-6">
                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-900">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500">Email:</span>
                            <span>{consultation.contact}</span>
                            <span className="text-gray-500">Phone:</span>
                            <span>{consultation.phone}</span>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-900">Message</h3>
                        <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 whitespace-pre-wrap">
                            {consultation.message}
                        </div>
                    </div>

                    {/* Memo */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-gray-900">Memo</h3>
                            <Button size="sm" onClick={handleSaveMemo}>Save</Button>
                        </div>
                        <Textarea
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="Add internal notes here..."
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* Activity Log */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-gray-900">Activity History</h3>
                        <ScrollArea className="h-[300px] rounded-md border p-4">
                            {isLoadingLogs ? (
                                <div className="text-sm text-gray-500 text-center">Loading logs...</div>
                            ) : logs.length === 0 ? (
                                <div className="text-sm text-gray-500 text-center">No activity yet.</div>
                            ) : (
                                <div className="space-y-4">
                                    {logs.map((log) => (
                                        <div key={log.id} className="flex flex-col space-y-1 text-sm border-b pb-2 last:border-0">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-900">{log.actor_email}</span>
                                                <span className="text-xs text-gray-500" suppressHydrationWarning>
                                                    {new Date(log.created_at).toLocaleString('vi-VN')}
                                                </span>
                                            </div>
                                            <div className="text-gray-700">
                                                {formatLogAction(log)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function formatLogAction(log: Log) {
    switch (log.action) {
        case 'status_change':
            return `Changed status from "${log.details.from}" to "${log.details.to}"`
        case 'memo_update':
            return `Updated the memo`
        case 'created':
            return `Created the request`
        default:
            return log.action
    }
}
