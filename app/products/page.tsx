// import Image from 'next/image';
// import Link from 'next/link';
// import { client } from '@/lib/sanity.client';
// import { urlFor } from '@/lib/sanity.image';

// async function getProducts() {
//   // UPDATED: Fetching the full object to ensure the store gets all data
//   return await client.fetch(`*[_type == "product" && defined(slug.current)] | order(_createdAt desc)`);
// }

// export default async function CollectionPage() {
//   const products = await getProducts();

//   return (
//     <main className="max-w-[1440px] mx-auto px-6 py-12 md:py-24">
//       <div className="mb-12">
//         <nav className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">
//           Home / Shop All
//         </nav>
//         <h1 className="font-playfair text-4xl md:text-5xl mb-4">The Diamond Collection</h1>
//         <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
//           Ethically sourced, masterfully cut. Explore our curated selection of high-jewelry pieces designed for a lifetime of brilliance.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-12">
//         <aside className="w-full md:w-64 space-y-10 hidden md:block">
//           <div>
//             <h4 className="font-playfair text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Metal</h4>
//             <div className="space-y-3">
//               {['14k Yellow Gold', '18k White Gold', 'Platinum', '18k Rose Gold'].map((m) => (
//                 <label key={m} className="flex items-center gap-3 text-[11px] uppercase tracking-wider cursor-pointer hover:text-gray-500 transition-colors">
//                   <input type="checkbox" className="accent-black w-3 h-3 cursor-pointer" /> {m}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-playfair text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Stone Shape</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {['Brilliant', 'Emerald', 'Heart', 'Oval'].map((s) => (
//                 <button key={s} className="border border-gray-100 py-3 text-[9px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors">
//             Clear All Filters
//           </button>
//         </aside>

//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
//             <span className="text-[10px] text-gray-400 uppercase tracking-widest">{products.length} Products</span>
//             <select className="text-[10px] uppercase tracking-widest bg-transparent outline-none cursor-pointer font-bold">
//               <option>Sort By: Featured</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
//             {products.map((product: any) => (
//               <Link href={`/products/${product.slug.current}`} key={product._id} className="group cursor-pointer">
//                 {/* Image Container - formatting with aspect-4/5 retained */}
//                 <div className="bg-[#F9F9F9] aspect-[4/5] relative mb-6 overflow-hidden">
//                   {product.image && (
//                     <Image 
//                       src={urlFor(product.image).url()} 
//                       alt={product.altText || product.name || "Luxury Diamond Jewelry"}
//                       fill
//                       /* MODIFIED: Reverted to object-contain.
//                          This shrinks the photo to show completely within the format without zoom or crop. */
//                       className="object-contain transition-transform duration-700 group-hover:scale-110"
//                       sizes="(max-width: 768px) 50vw, 33vw"
//                     />
//                   )}
//                   <button className="absolute top-4 right-4 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
//                   </button>
//                 </div>

//                 <div className="text-center space-y-2">
//                   <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 block font-medium">
//                     {product.category?.replace('-', ' ')}
//                   </span>
//                   <h3 className="font-playfair text-sm tracking-tight group-hover:underline decoration-1 underline-offset-4">
//                     {product.name}
//                   </h3>
//                   <p className="text-xs font-bold text-black">
//                     ${product.price ? product.price.toLocaleString() : "Contact for Price"}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="mt-20 flex justify-center items-center gap-6">
//             <button className="text-gray-300 hover:text-black transition-colors">{"<"}</button>
//             <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">1</span>
//             <span className="text-[10px] text-gray-400 cursor-pointer hover:text-black">2</span>
//             <span className="text-[10px] text-gray-400 cursor-pointer hover:text-black">3</span>
//             <button className="text-black font-bold hover:translate-x-1 transition-transform">{">"}</button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


















// import Image from 'next/image';
// import Link from 'next/link';
// import { client } from '@/lib/sanity.client';
// import { urlFor } from '@/lib/sanity.image';

// async function getProducts() {
//   return await client.fetch(`*[_type == "product" && defined(slug.current)] | order(_createdAt desc)`);
// }

// export default async function CollectionPage() {
//   const products = await getProducts();

//   return (
//     <main className="max-w-[1440px] mx-auto px-6 py-12 md:py-24">
//       <div className="mb-12">
//         <nav className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">
//           Home / Shop All
//         </nav>
//         <h1 className="font-playfair text-4xl md:text-5xl mb-4">The Diamond Collection</h1>
//         <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
//           Ethically sourced, masterfully cut. Explore our curated selection of high-jewelry pieces designed for a lifetime of brilliance.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-12">
//         {/* Sidebar */}
//         <aside className="w-full md:w-64 space-y-10 hidden md:block">
//           <div>
//             <h4 className="font-playfair text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Metal</h4>
//             <div className="space-y-3">
//               {['14k Yellow Gold', '18k White Gold', 'Platinum', '18k Rose Gold'].map((m) => (
//                 <label key={m} className="flex items-center gap-3 text-[11px] uppercase tracking-wider cursor-pointer hover:text-gray-500 transition-colors">
//                   <input type="checkbox" className="accent-black w-3 h-3 cursor-pointer" /> {m}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-playfair text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Stone Shape</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {['Brilliant', 'Emerald', 'Heart', 'Oval'].map((s) => (
//                 <button key={s} className="border border-gray-100 py-3 text-[9px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors">
//             Clear All Filters
//           </button>
//         </aside>

//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
//             <span className="text-[10px] text-gray-400 uppercase tracking-widest">{products.length} Products</span>
//             <select className="text-[10px] uppercase tracking-widest bg-transparent outline-none cursor-pointer font-bold">
//               <option>Sort By: Featured</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
//             {products.map((product: any) => (
//               <Link href={`/products/${product.slug.current}`} key={product._id} className="group cursor-pointer">
                
//                 {/* --- UPDATED IMAGE CONTAINER --- */}
//                 <div className="bg-[#F9F9F9] aspect-4/5 relative mb-6 overflow-hidden flex items-center justify-center p-12">
//                   {product.image && (
//                     <div className="relative w-full h-full">
//                       <Image 
//                         src={urlFor(product.image).url()} 
//                         alt={product.altText || product.name || "Jewelry"}
//                         fill
//                         /* Using object-contain and a wrapper div ensures the photo 
//                           is scaled to fit the inner box, never touching the outer gray frame.
//                         */
//                         className="object-contain transition-transform duration-700 group-hover:scale-110"
//                         sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//                       />
//                     </div>
//                   )}
//                   <button className="absolute top-4 right-4 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
//                   </button>
//                 </div>

//                 <div className="text-center space-y-2">
//                   <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 block font-medium">
//                     {product.category?.replace('-', ' ')}
//                   </span>
//                   <h3 className="font-playfair text-sm tracking-tight group-hover:underline decoration-1 underline-offset-4">
//                     {product.name}
//                   </h3>
//                   <p className="text-xs font-bold text-black">
//                     ${product.price ? product.price.toLocaleString() : "Contact for Price"}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="mt-20 flex justify-center items-center gap-6">
//             <button className="text-gray-300 hover:text-black transition-colors">{"<"}</button>
//             <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">1</span>
//             <span className="text-[10px] text-gray-400 cursor-pointer hover:text-black">2</span>
//             <span className="text-[10px] text-gray-400 cursor-pointer hover:text-black">3</span>
//             <button className="text-black font-bold hover:translate-x-1 transition-transform">{">"}</button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
























import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';

async function getProducts() {
  // Fetching all products ordered by newest first
  return await client.fetch(`*[_type == "product" && defined(slug.current)] | order(_createdAt desc)`);
}

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12 md:py-24">
      {/* Header Section */}
      <div className="mb-12">
        <nav className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">
          Home / Shop All
        </nav>
        <h1 className="font-playfair text-4xl md:text-5xl mb-4 text-black">The Diamond Collection</h1>
        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
          Ethically sourced, masterfully cut. Explore our curated selection of high-jewelry pieces designed for a lifetime of brilliance.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-10 hidden md:block">
          <div>
            <h4 className="font-playfair text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Metal</h4>
            <div className="space-y-3">
              {['14k Yellow Gold', '18k White Gold', 'Platinum', '18k Rose Gold'].map((m) => (
                <label key={m} className="flex items-center gap-3 text-[11px] uppercase tracking-wider cursor-pointer hover:text-gray-500 transition-colors">
                  <input type="checkbox" className="accent-black w-3 h-3 cursor-pointer" /> {m}
                </label>
              ))}
            </div>
          </div>
          <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors">
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((product: any) => (
              <Link href={`/products/${product.slug.current}`} key={product._id} className="group cursor-pointer">
                
                {/* --- IMAGE CONTAINER: PORTRAIT FIT --- */}
                <div className="bg-[#F9F9F9] aspect-[4/5] relative mb-6 overflow-hidden flex items-center justify-center">
                  {product.image && (
                    <Image 
                      src={urlFor(product.image).url()} 
                      alt={product.altText || product.name || "Jewelry"}
                      fill
                      /* object-contain: Ensures the whole diamond is visible without cropping.
                         p-2: Minimal padding so the product looks large but stays within the frame.
                      */
                      className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  )}
                  {/* Luxury Wishlist Overlay */}
                  <button className="absolute top-4 right-4 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 block font-medium">
                    {product.category?.replace('-', ' ')}
                  </span>
                  <h3 className="font-playfair text-sm tracking-tight text-black group-hover:underline decoration-1 underline-offset-4">
                    {product.name}
                  </h3>
                  <p className="text-xs font-bold text-black">
                    ${product.price ? product.price.toLocaleString() : "Contact for Price"}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-6">
            <button className="text-gray-300 hover:text-black transition-colors">{"<"}</button>
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span className="text-[10px] text-gray-400 cursor-pointer hover:text-black">2</span>
            <button className="text-black font-bold hover:translate-x-1 transition-transform">{">"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}