// import { auth } from '@clerk/nextjs/server';
// import RoomProvider from '@/components/RoomProvider';

// function DocLayout({
//     children,
//     params:{id},
// }:{
//     children:React.ReactNode;
//     params:{id:string};
// }){
//     auth.protect();  // error or no?
//     return (
//         <RoomProvider roomId={id}>
//             {children}
//         </RoomProvider>
//     )
// }

// export default DocLayout

import { auth } from '@clerk/nextjs/server';
import RoomProvider from '@/components/RoomProvider';

async function DocLayout({
    children,
    params: paramsPromise 
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>; 
}) {
    const params = await paramsPromise; // ✅ Await params
    const authData = await auth(); // ✅ Await auth() properly

    if (!authData?.userId) {
        throw new Error("Unauthorized access");
    }

    return (
        <RoomProvider roomId={params.id}>
            {children}
        </RoomProvider>
    );
}

export default DocLayout;
