// import { client } from '@/lib/sanity.client';
// import { urlFor } from '@/lib/sanity.image';
// import Image from 'next/image';
// import AddToCartDetails from '@/components/AddToCartDetails';

// async function getProduct(slug: string) {
//   return await client.fetch(
//     `*[_type == "product" && slug.current == $slug][0]`,
//     { slug }
//   );
// }

// export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   const resolvedParams = await params;
//   const product = await getProduct(resolvedParams.slug);

//   if (!product) return <div className="py-20 text-center font-playfair">Product not found</div>;

//   return (
//     <main className="max-w-1440px mx-auto px-6 py-24 flex flex-col md:flex-row gap-12">
//       <div className="flex-1 bg-[#F9F9F9] aspect-square relative">
//         <Image 
//           src={urlFor(product.image).url()} 
//           alt={product.altText || product.name}
//           fill
//           className="object-contain p-12"
//         />
//       </div>

//       <div className="flex-1 space-y-6">
//         <p className="font-luxury text-2xl text-black lowercase mb- -10px">A Legacy of Light</p>
//         <p className="text-[10px] uppercase tracking-widest text-gray-400">{product.category}</p>
//         <h1 className="font-playfair text-4xl text-black uppercase tracking-tight">{product.name}</h1>
//         <p className="text-xl font-bold text-black">${product.price?.toLocaleString()}</p>
        
//         <div className="border-t border-b border-gray-100 py-4 space-y-2">
//            <p className="text-xs font-serif"><strong>Metal:</strong> {product.metal}</p>
//            <p className="text-xs font-serif"><strong>Stone:</strong> {product.stoneShape}</p>
//         </div>
        
//         {/* Pass the full product object here */}
//         <AddToCartDetails product={product} />

//         <div className="pt-4">
//           <p className="text-sm font-serif leading-relaxed text-zinc-600">
//             {product.description || "Our heritage is built on a century of ethical sourcing and unparalleled diamond cutting expertise."}
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }








import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import Image from 'next/image';
import AddToCartDetails from '@/components/AddToCartDetails';

async function getProduct(slug: string) {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) return <div className="py-20 text-center font-playfair">Product not found</div>;

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-24 flex flex-col md:flex-row gap-12">
      {/* Image Container: Fixed aspect ratio with object-contain to fit all screen sizes */}
      <div className="flex-1 bg-[#F9F9F9] aspect-square relative overflow-hidden">
        <Image 
          src={urlFor(product.image).url()} 
          alt={product.altText || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8 md:p-12"
          priority
        />
      </div>

      <div className="flex-1 space-y-6">
        <p className="font-luxury text-2xl text-black lowercase mb-[-10px]">A Legacy of Light</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400">{product.category}</p>
        <h1 className="font-playfair text-4xl text-black uppercase tracking-tight">{product.name}</h1>
        <p className="text-xl font-bold text-black">${product.price?.toLocaleString()}</p>
        
        <div className="border-t border-b border-gray-100 py-4 space-y-2">
           <p className="text-xs font-serif"><strong>Metal:</strong> {product.metal}</p>
           <p className="text-xs font-serif"><strong>Stone:</strong> {product.stoneShape}</p>
        </div>
        
        <AddToCartDetails product={product} />

        <div className="pt-4">
          <p className="text-sm font-serif leading-relaxed text-zinc-600">
            {product.description || "Our heritage is built on a century of ethical sourcing and unparalleled diamond cutting expertise."}
          </p>
        </div>
      </div>
    </main>
  );
}