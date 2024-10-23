import { cn } from "@/lib/utils";
import { Ghost, User } from "lucide-react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-emerald-300": isUserMessage,
              }
            )}
          >
            {isUserMessage ? <User className="size-5" /> : <Ghost className="size-5 text-emerald-200" />}
          </div>

          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-amber-800">
                {isUserMessage ? "You" : "Ghostbot"}
              </span>
            </div>

            <p className="text-sm font-normal py-2.5 text-emerald-200">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};