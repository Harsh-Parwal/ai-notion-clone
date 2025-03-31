'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {Input} from "./ui/input";
import * as Y from "yjs";
import { MessageCircleCode, BotIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function ChatToDocument({doc}:{doc:Y.Doc}) {
    const [input,setInput]=useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [summary, setSummary] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion=async(e: FormEvent)=>{
        e.preventDefault();

        setQuestion(input);
        startTransition(async()=>{
            const documentData=doc.get("document-store").toJSON();
            const res=await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        question:input,
                    }),
                }
            )
            if(res.ok){
                const {message}=await res.json();
                setInput("");
                setSummary(message);
                toast.success("Question asked successfully");
            }
        })
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>
                <MessageCircleCode className="mr-2"/>
                Chat to Document
            </DialogTrigger>
        </Button>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Chat to the Document</DialogTitle>
                <DialogDescription>
                    Ask a question and chat to the document with AI.
                </DialogDescription>

                <hr className="mt-5"/>
                {question && <p className="mt-5 text-gray-500">Q:{question}</p>}
            </DialogHeader>

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

            <form onSubmit={handleAskQuestion} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="i.e. what is this about?"
                    className="w-full"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button type="submit" disabled={!input||isPending}>
                    {isPending?"Asking...":"Ask"}    
                </Button>  
            </form>
        </DialogContent>
    </Dialog>
  );
}

export default ChatToDocument
