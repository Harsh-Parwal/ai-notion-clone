'use client';

// import Document from "@/components/Document";
// function DocumentPage({
//         params:{id},
//     }: {
//         params:{
//             id:string;
//         };
//     }) {
//     return (
//       <div className="flex flex-col flex-1 min-h-screen">
//         <Document id={id}/>
//       </div>
//     );
//   }
  
//   export default DocumentPage;

"use client";

import { useParams } from "next/navigation";
import Document from "@/components/Document";

function DocumentPage() {
    const params = useParams(); 
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
      <div className="flex flex-col flex-1 min-h-screen">
        {id ? <Document id={id} /> : <p>Loading...</p>}
      </div>
    );
}

export default DocumentPage;

  