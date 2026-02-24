import { CopyableText } from "@/components/common/CopyableText"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserData } from "@/types/auth.types"

export const AvatarSection = ({ user, showAddress = false }: { user: UserData | null, showAddress?: boolean }) => {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || "?"}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name || "Loading..."}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                
                {/* 2. Use the new reusable component here! */}
                {user?.address && showAddress && (
                    <CopyableText text={user.address} />
                )}
            </div>
        </>
    )
}