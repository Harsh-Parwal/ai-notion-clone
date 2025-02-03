import React, { Children } from 'react'
import { auth } from '@clerk/nextjs/server';

function DocLayout({children,params:{id}}:{children:React.ReactNode;params:{id:string};}){
    auth.protect(); // check here for error
    return (
        <div>
            {children}
        </div>
    )
}

export default DocLayout
