"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateForm() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [priority, setPriority] = useState("low")
    const [isloading, setIsLoading] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const newTicket = {
        id: Math.floor(Math.random() * 10000).toString(),
        title,
        body,
        priority,
        user_email: 'barake@koi.dev',
        };

        // Send the data to your internal API route
        const res = await fetch('/api/tickets', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTicket),
        });

        if (res.status === 201) {
            router.refresh(); 
            router.push('/tickets'); 
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2"> 
            <label>
            <span>Title:</span>
            <input
            required 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
        </label>
        <label>
            <span>Body:</span>
            <textarea
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
            />
        </label>
        <label>
            <span>Priority:</span>
            <select 
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
            >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            </select>
        </label>
        <button
        className="btn-primary"
        disabled={isloading}
        >
            {isloading && <span>Adding...</span>}
            {!isloading && <span>Add Ticket</span>}
        </button>
        </form>
    )
}
