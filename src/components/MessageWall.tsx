"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Message } from "@/lib/types";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "most";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} perce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} órája`;
  const days = Math.floor(hours / 24);
  return `${days} napja`;
}

export function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  }

  async function handleSave() {
    const content = newMessage.trim();
    if (!content || saving) return;

    setSaving(true);
    const { data, error } = await supabase
      .from("messages")
      .insert({ content })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [data, ...prev]);
      setNewMessage("");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Input section */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Üzenet írása..."
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!newMessage.trim() || saving}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Mentés..." : "Mentés"}
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Betöltés...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Még nincsenek üzenetek. Írj az elsőt!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="p-4 sm:px-6 flex items-start justify-between gap-3 group hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {timeAgo(message.created_at)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(message.id)}
                className="shrink-0 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Törlés"
                title="Törlés"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
