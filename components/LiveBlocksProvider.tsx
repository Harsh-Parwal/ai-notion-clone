'use client'
import {
    LiveblocksProvider,
    RoomProvider,
  } from "@liveblocks/react/suspense"
// import { error } from "console"

function LiveBlocksProvider({children}:{
    children:React.ReactNode
}) 
{
    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY){
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
    }

    return (
        <div>
            <LiveblocksProvider
                authEndpoint={"/auth-endpoint"}
                throttle={16}>
                    
                {children}
            </LiveblocksProvider>
        </div>
    )
}

export default LiveBlocksProvider
