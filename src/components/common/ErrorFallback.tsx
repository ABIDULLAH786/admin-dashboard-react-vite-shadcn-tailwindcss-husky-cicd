import React from "react";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react"; 

interface ErrorFallbackProps {
  error?: Error | null;
  onRetry: () => void;
  showRetry?: boolean;
  title?: string; // Optional: change title per widget
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  onRetry,
  showRetry = true,
  title = "Component Failed to Load",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center   rounded-lg ">
      <AlertCircle className="w-8 h-8 text-[#F6465D] mb-3" />
      
      <h2 className="font-semibold text-destructive pb-2">{title}</h2>

      {error && (
        <code className="mt-2 mb-6 px-2 py-1 text-[#F6465D] text-xs rounded border border-[#F6465D]/20 break-all max-w-md">
          {error.message}
        </code>
      )}

      {showRetry && (
        <Button 
          onClick={onRetry} 
          variant="default"
          className=" text-black  font-bold px-6"
        >
          {/* <RefreshCcw className="w-4 h-4 mr-2" /> */}
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorFallback;