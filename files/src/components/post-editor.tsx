import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading, List, Link, Code } from "lucide-react";

interface PostEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PostEditor({ value, onChange, placeholder }: PostEditorProps) {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const insertMarkdown = (markdown: string) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const newValue = before + markdown + after;
    onChange(newValue);
    
    // Focus and set cursor position
    setTimeout(() => {
      textareaRef.focus();
      textareaRef.setSelectionRange(start + markdown.length, start + markdown.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, markdown: "**bold**", tooltip: "Bold" },
    { icon: Italic, markdown: "*italic*", tooltip: "Italic" },
    { icon: Heading, markdown: "# ", tooltip: "Heading" },
    { icon: List, markdown: "- ", tooltip: "List" },
    { icon: Link, markdown: "[link](url)", tooltip: "Link" },
    { icon: Code, markdown: "`code`", tooltip: "Code" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => insertMarkdown(button.markdown)}
            title={button.tooltip}
          >
            <button.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
      
      <Textarea
        ref={setTextareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] resize-none border-none focus-visible:ring-0 text-gray-900 placeholder-gray-400"
      />
    </div>
  );
}
