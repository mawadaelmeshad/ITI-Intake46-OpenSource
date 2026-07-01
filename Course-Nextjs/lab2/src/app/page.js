import Link from 'next/link';
import Image from 'next/image';
import Search from '@/components/Search';

async function getProducts(query) {
  const url = query 
    ? `https://dummyjson.com/products/search?q=${query}`
    : 'https://dummyjson.com/products?limit=12';
    
  const res = await fetch(url, {
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds (Req 7, 10)
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || '';
  
  const data = await getProducts(query);
  const products = data.products;

  return (
    <div className="relative">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-indigo-500/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      <div className="text-center mb-16 pt-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-400 mb-6 drop-shadow-sm">
          Welcome to NextStore
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto font-light">
          Discover a curated collection of premium products, designed to elevate your everyday experience.
        </p>
      </div>
      
      <Search />
      
      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-2xl text-slate-500 font-light">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-slate-900/40 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden border border-white/5 hover:border-white/10 hover:-translate-y-1">
              <div className="relative h-64 w-full bg-white/5 overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <h2 className="text-lg font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-indigo-300 transition-colors">{product.title}</h2>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow font-light leading-relaxed">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-2xl font-black text-white">${product.price}</span>
                  <span className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 px-4 py-1.5 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
