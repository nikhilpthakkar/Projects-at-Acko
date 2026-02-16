"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, Link2 } from "lucide-react";

interface FigmaLinkFieldProps {
  componentId: string;
  value: string;
  onChange: (url: string) => void;
}

export function FigmaLinkField({ componentId, value, onChange }: FigmaLinkFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    onChange(draft);
    setEditing(false);
  };

  if (!editing && value) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-xl">
        <Check size={16} className="text-green-700 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-green-700">Figma Component Linked</div>
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 truncate block hover:underline">{value}</a>
        </div>
        <Button size="sm" variant="ghost" onClick={() => { setDraft(value); setEditing(true); }} className="text-xs">Edit</Button>
        <a href={value} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} className="text-green-600" /></a>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Link2 size={16} className="text-onyx-400 flex-shrink-0" />
        <span className="text-xs font-semibold text-onyx-600">Figma Component URL</span>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="https://figma.com/design/..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className="text-xs"
        />
        <Button size="sm" onClick={save} className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
          {value ? "Update" : "Link"}
        </Button>
        {editing && <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="text-xs">Cancel</Button>}
      </div>
    </div>
  );
}
