import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
  return products;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await res.json();
    return {
      title: `${product.title} | NextStore`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: 'Product | NextStore',
    };
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product details');
  }
  
  const product = await res.json();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Link href="/" className="group inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-12 font-semibold transition-colors">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Gallery
      </Link>
      
      <div className="bg-slate-900/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative lg:w-1/2 p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
          <div className="absolute inset-8 bg-white/5 rounded-[2rem] border border-white/5"></div>
          <div className="relative w-full h-full aspect-square">
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>
        
        <div className="p-8 lg:p-16 lg:w-1/2 flex flex-col justify-center relative z-10 border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-950/20">
          <div className="mb-4">
            <span className="inline-block bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6 leading-tight">
            {product.title}
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
            {product.description}
          </p>
          
          <div className="flex items-end gap-6 mb-12">
            <span className="text-6xl font-black text-white tracking-tight">${product.price}</span>
            <div className="flex items-center pb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-700 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-400 font-medium text-lg">({product.rating})</span>
            </div>
          </div>
          
          <button className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] hover:-translate-y-1">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-xl flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
