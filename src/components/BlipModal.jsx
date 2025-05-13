import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function BlipModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("")
  const [story, setStory] = useState("")

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!story.trim()) return

    const blip = {
      title: title.trim(),
      story: story.trim(),
      created_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("blips").insert([blip])
    if (error) {
      console.error("❌ Failed to save blip:", error)
    } else {
      onSubmit(blip)
      setTitle("")
      setStory("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="modal-glow w-full max-w-md relative text-left">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-pink-400 text-2xl hover:text-red-400 transition"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-cyan-300">Contribute to the Blipverse</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Your blip... be as weird or raw as you want"
            rows="5"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
          <button type="submit">🚀 Launch Blip</button>
        </form>
      </div>
    </div>
  )
}
