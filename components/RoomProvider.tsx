'use client'

import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper
  } from "@liveblocks/react/suspense"
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";

function RoomProvider({roomId,children}:{roomId:string;children:React.ReactNode}) {
  return (
    <div>
      <RoomProviderWrapper
        id={roomId}
        initialPresence={{
            cursor:null
        }}>

        <ClientSideSuspense fallback={<LoadingSpinner/>}>
            <LiveCursorProvider>
                {children}
            </LiveCursorProvider>
        </ClientSideSuspense>
      </RoomProviderWrapper>
    </div>
  )
}

export default RoomProvider
