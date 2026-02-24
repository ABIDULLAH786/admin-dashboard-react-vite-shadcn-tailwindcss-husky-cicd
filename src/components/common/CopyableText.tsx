import { Check, Copy } from "lucide-react"
import { useState } from "react"

export const CopyableText = ({ text, className = "" }: { text: string, className?: string }) => {
    const [copied, setCopied] = useState(false)

    const formatText = (addr: string) => {
        if (!addr) return ""
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation() 
        
        if (text) {
            navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) 
        }
    }

    return (
        <div 
            onClick={handleCopy}
            // Swap text-muted-foreground for text-primary when copied
            className={`flex items-center gap-1.5 mt-0.5 cursor-pointer text-xs transition-colors w-fit ${
                copied ? "text-primary" : "text-muted-foreground hover:text-foreground"
            } ${className}`}
            title="Copy Wallet text"
        >
            <span className="font-mono">{formatText(text)}</span>
            {copied ? (
                // You can also change this to text-primary if you want the checkmark to match the text!
                // Left it as text-success for the green confirmation.
                <Check className="h-3 w-3 text-success" />
            ) : (
                <Copy className="h-3 w-3" />
            )}
        </div>
    )
}