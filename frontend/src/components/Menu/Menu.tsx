"use client"

import Link from 'next/link';

export function Menu() {

    const imageSrc = process.env.APP_BRANDED === 'BT'
    ? '/images/bt-logo.png'
    : '/images/gcp-logo.png'; 
    
    return (
        <div>
        </div>
        
        // <nav className="bg-black p-4 flex justify-between menu-bar" style={{ height: '6vh', alignItems: 'center' }}>
        //     <ul className="flex">
        //         <li className="mr-20">
        //             <Link legacyBehavior href="/">
        //                 <img
        //                     src={imageSrc}
        //                     className="group-hover:hidden fill-neutral-dark-5 pointer-on-hover"
        //                     height="30vh"
        //                     width="30vh"
        //                 />
        //             </Link>
        //         </li>
        //         {process.env.APP_BRANDED === 'BT' && (
        //             <>
        //                 <li className="mr-10">
        //                 <Link legacyBehavior href="/sap-chat">
        //                     <a className="text-white">SAP Chat</a>
        //                 </Link>
        //                 </li>
        //                 <li className="mr-10">
        //                 <Link legacyBehavior href="/asset-inventory-chat">
        //                     <a className="text-white">Asset Inventory Chat</a>
        //                 </Link>
        //                 </li>
        //                 <li className="mr-10">
        //                 <Link legacyBehavior href="/ask-me-anything-chat">
        //                     <a className="text-white">Ask Me Anything</a>
        //                 </Link>
        //                 </li>
        //             </>
        //         )}
        //     </ul>
        //     <ul className="flex items-center justify-end">
        //         <li>
        //             <Link legacyBehavior href="/how">
        //                 <a className="text-white">Diagram</a>
        //             </Link>
        //         </li>
        //     </ul>
        // </nav>
    );
}