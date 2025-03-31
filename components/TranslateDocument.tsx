'use client'
import * as Y from "yjs";
import { useState, useTransition, FormEvent } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";

// Language Options
type Language = "english" | "spanish" | "french" | "german" | "chinese" | "arabic" | "hindi" | "russian" | "japanese";
const languages: Language[] = ["english", "spanish", "french", "german", "chinese", "arabic", "hindi", "russian", "japanese"];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const handleTranslate = async (e: FormEvent) => {
        e.preventDefault();

        if (!language) {
            toast.error("Please select a language!");
            return;
        }

        startTransition(async () => {
            try {
                const documentData = doc.get("document-store")?.toJSON() || {}; // Ensure data exists
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ documentData, targetLang: language }),
                });

                if (!res.ok) {
                    throw new Error("Failed to translate the document");
                }

                const { translated_text } = await res.json();
                setSummary(translated_text);
                toast.success("Translation successful!");
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong! Please try again.");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger className="flex items-center gap-2">
                    <LanguagesIcon className="w-5 h-5" />
                    <span>Translate</span>
                </DialogTrigger>
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate Document</DialogTitle>
                    <DialogDescription>
                        Select a language, and AI will translate a summary of the document.
                    </DialogDescription>
                </DialogHeader>

                <hr className="mt-5" />

                {summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-auto gap-3 p-5 bg-gray-100 rounded-md">
                        <div className="flex items-center gap-2">
                            <BotIcon className="w-5 h-5 text-blue-500" />
                            <p className="font-bold">{isPending ? "AI is thinking..." : "AI Says:"}</p>
                        </div>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {isPending ? "Thinking..." : summary}
                        </ReactMarkdown>
                    </div>
                )}

                <form onSubmit={handleTranslate} className="flex flex-col gap-3">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button type="submit" disabled={isPending} className="flex items-center gap-2">
                        {isPending ? "Translating..." : "Translate"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default TranslateDocument;
