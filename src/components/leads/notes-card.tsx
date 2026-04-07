"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NoteItem } from "@/types/lead";
import { StickyNote, Plus } from "lucide-react";

interface NotesCardProps {
  notes: NoteItem[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotesCard({ notes }: NotesCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState("");

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            Notes
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-3 w-3" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showForm && (
          <div className="space-y-2">
            <Textarea
              placeholder="Write a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px] text-sm"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setNewNote("");
                  setShowForm(false);
                }}
              >
                Save Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setNewNote("");
                  setShowForm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {notes.length === 0 && !showForm ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="rounded-lg bg-secondary/50 p-3">
              <p className="text-sm leading-relaxed">{note.content}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {note.author} · {formatDate(note.createdAt)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
