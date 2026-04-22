import { Suspense } from "react"
import EventRegister from "./EventRegister"

export default function EventRegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <EventRegister />
        </Suspense>
    )
}