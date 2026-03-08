// import Image from 'next/image';
// import Link from 'next/link';
// import { client } from '@/lib/sanity.client';
// import { urlFor } from '@/lib/sanity.image';
// import { auth, signIn, signOut } from "@/auth"; // Added Auth imports

// async function getData() {
//   const query = `*[_type in ["hero", "product"]] {
//     ...,
//     "heroImageUrl": backgroundImage.asset->url,
//     "productImageUrl": image.asset->url
//   }`;
//   const data = await client.fetch(query);
//   return data;
// }

// export default async function HomePage() {
//   const data = await getData();
//   const session = await auth(); // Check for user session
  
//   const hero = data.find((item: any) => item._type === 'hero');
//   const products = data.filter((item: any) => item._type === 'product');

//   return (
//     <main>
//       {/* 1. Dynamic Hero Section */}
//       <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
//         {hero?.backgroundImage && (
//           <Image 
//             src={urlFor(hero.backgroundImage).url()} 
//             alt={hero?.headingScript || "Luxe Diamond Hero Image"} 
//             fill 
//             className="object-cover" 
//             priority 
//           />
//         )}
//         <div className="relative z-10 text-center text-black px-4">
//           {/* Authentication Status Header */}
//           <div className="mb-6">
//             {session ? (
//               <div className="flex flex-col items-center gap-2">
//                 <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Welcome Back</span>
//                 <div className="flex gap-4">
//                   <Link href="/studio">
//                     <button className="border border-black px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition">Admin Studio</button>
//                   </Link>
//                   <form action={async () => { "use server"; await signOut(); }}>
//                     <button className="text-[10px] uppercase tracking-widest underline decoration-gray-300 underline-offset-4">Sign Out</button>
//                   </form>
//                 </div>
//               </div>
//             ) : (
//               <form action={async () => { "use server"; await signIn(); }}>
//                 <button className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">Partner Login</button>
//               </form>
//             )}
//           </div>

//           <h1 className="font-meie text-6xl md:text-8xl mb-4">{hero?.headingScript || "The Brilliance of Forever"}</h1>
//           <p className="font-playfair italic text-lg mb-8 max-w-xl mx-auto">
//             {hero?.subheading || "Experience the pinnacle of craftsmanship."}
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Link href="/products">
//                 <button className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest">{hero?.ctaText || "Shop Collection"}</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* 2. Product Category Display */}
//       <section className="py-20 px-8">
//         <div className="flex justify-between items-end mb-12">
//           <div>
//             <span className="uppercase text-[10px] tracking-tighter text-gray-500">Curated Selection</span>
//             <h2 className="font-playfair text-4xl mt-2">New Arrivals</h2>
//           </div>
//           <Link href="/products">
//             <span className="uppercase text-[10px] underline cursor-pointer hover:text-gray-500 transition-colors">
//               View All
//             </span>
//           </Link>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {products.map((product: any) => (
//             <div key={product._id} className="space-y-4">
//               <div className="bg-gray-50 aspect-4/5 relative overflow-hidden">
//                 {product.image && (
//                   <Image 
//                     src={urlFor(product.image).url()} 
//                     alt={product.name || "Luxury Diamond Product"} 
//                     fill 
//                     className="object-contain p-8 transition-transform hover:scale-105 duration-500" 
//                   />
//                 )}
//               </div>
//               <h4 className="font-playfair text-sm">{product.name || "Untitled Ring"}</h4>
//               <p className="text-xs font-bold">${product.price?.toLocaleString() || "Contact for Price"}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. Heritage/Expert Section (Static) */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-24 px-8 items-center bg-gray-50">
//         <div className="relative h-600px">
//           <Image 
//             src="/expert-craftsman.jpg" 
//             alt="Expert examining diamond quality" 
//             fill 
//             className="object-cover" 
//           />
//         </div>
//         <div className="space-y-8 max-w-md">
//           <h2 className="font-meie text-5xl">A Legacy of Light</h2>
//           <h3 className="font-playfair text-3xl leading-snug">Hand-crafted excellence since 1924, defined by purity and passion.</h3>
//           <p className="text-gray-600 text-sm leading-relaxed">Our heritage is built on a century of ethical sourcing and unparalleled diamond cutting expertise.</p>
//           <button className="bg-black text-white px-10 py-4 uppercase text-xs tracking-widest">Explore Our History</button>
//         </div>
//       </section>

//       {/* 4. Newsletter Section (Static) */}
//       <section className="bg-[#0a0a0a] text-white py-24 text-center">
//         <h2 className="font-playfair text-4xl mb-4 italic">Join the Inner Circle</h2>
//         <p className="text-gray-400 text-xs uppercase tracking-widest mb-10">Be the first to discover new collections and exclusive events.</p>
//         <div className="flex max-w-md mx-auto border-b border-gray-700 pb-2">
//           <input type="email" placeholder="Your Email Address" className="bg-transparent flex-1 text-sm outline-none px-4" />
//           <button className="bg-black px-6 py-2 uppercase text-[10px] tracking-widest">Subscribe</button>
//         </div>
//       </section>
//     </main>
//   );
// }


























import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import { auth, signIn, signOut } from "@/auth";

async function getData() {
  // Updated query to fetch all fields for hero and product
  const query = `*[_type in ["hero", "product"]] {
    ...,
    "heroImageUrl": backgroundImage.asset->url,
    "productImageUrl": image.asset->url,
    "heritageImageUrl": heritageImage.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function HomePage() {
  const data = await getData();
  const session = await auth(); 
  
  const hero = data.find((item: any) => item._type === 'hero');
  const products = data.filter((item: any) => item._type === 'product');

  return (
    <main>
      {/* 1. Dynamic Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {hero?.backgroundImage && (
          <Image 
            src={urlFor(hero.backgroundImage).url()} 
            alt={hero?.headingScript || "Luxe Diamond Hero Image"} 
            fill 
            className="object-cover" 
            priority 
          />
        )}
        <div className="relative z-10 text-center text-black px-4">
          <div className="mb-6">
            {session ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Welcome Back</span>
                <div className="flex gap-4">
                  <Link href="/studio">
                    <button className="border border-black px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition">Admin Studio</button>
                  </Link>
                  <form action={async () => { "use server"; await signOut(); }}>
                    <button className="text-[10px] uppercase tracking-widest underline decoration-gray-300 underline-offset-4">Sign Out</button>
                  </form>
                </div>
              </div>
            ) : (
              <form action={async () => { "use server"; await signIn(); }}>
                <button className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">Partner Login</button>
              </form>
            )}
          </div>

          <h1 className="font-meie text-6xl md:text-8xl mb-4">{hero?.headingScript || "The Brilliance of Forever"}</h1>
          <p className="font-playfair italic text-lg mb-8 max-w-xl mx-auto">
            {hero?.subheading || "Experience the pinnacle of craftsmanship."}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
                <button className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest">{hero?.ctaText || "Shop Collection"}</button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Product Category Display */}
      <section className="py-20 px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="uppercase text-[10px] tracking-tighter text-gray-500">Curated Selection</span>
            <h2 className="font-playfair text-4xl mt-2">New Arrivals</h2>
          </div>
          <Link href="/products">
            <span className="uppercase text-[10px] underline cursor-pointer hover:text-gray-500 transition-colors">
              View All
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div key={product._id} className="space-y-4">
              <div className="bg-gray-50 aspect-4/5 relative overflow-hidden">
                {product.image && (
                  <Image 
                    src={urlFor(product.image).url()} 
                    alt={product.name || "Luxury Diamond Product"} 
                    fill 
                    className="object-contain p-8 transition-transform hover:scale-105 duration-500" 
                  />
                )}
              </div>
              <h4 className="font-playfair text-sm">{product.name || "Untitled Ring"}</h4>
              <p className="text-xs font-bold">${product.price?.toLocaleString() || "Contact for Price"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Heritage/Expert Section (NOW DYNAMIC) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-24 px-8 items-center bg-gray-50">
        <div className="relative h-600px">
          {hero?.heritageImage ? (
            <Image 
              src={urlFor(hero.heritageImage).url()} 
              alt="Expert examining diamond quality" 
              fill 
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
              Upload Heritage Image in Studio
            </div>
          )}
        </div>
        <div className="space-y-8 max-w-md">
          <h2 className="font-meie text-5xl">A Legacy of Light</h2>
          <h3 className="font-playfair text-3xl leading-snug">Hand-crafted excellence since 1924, defined by purity and passion.</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Our heritage is built on a century of ethical sourcing and unparalleled diamond cutting expertise.</p>
          <button className="bg-black text-white px-10 py-4 uppercase text-xs tracking-widest">Explore Our History</button>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className="bg-[#0a0a0a] text-white py-24 text-center">
        <h2 className="font-playfair text-4xl mb-4 italic">Join the Inner Circle</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-10">Be the first to discover new collections and exclusive events.</p>
        <div className="flex max-w-md mx-auto border-b border-gray-700 pb-2">
          <input type="email" placeholder="Your Email Address" className="bg-transparent flex-1 text-sm outline-none px-4" />
          <button className="bg-black px-6 py-2 uppercase text-[10px] tracking-widest">Subscribe</button>
        </div>
      </section>
    </main>
  );
}