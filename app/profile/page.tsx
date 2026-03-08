"use client";
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { client } from '@/lib/sanity.client';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';

export default function ProfilePage() {
  const { cart } = useCartStore() as any;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Sanity for this specific user
  useEffect(() => {
    const fetchOrders = async () => {
      // In a real app, filter by the logged-in user's email
      const query = `*[_type == "order"] | order(createdAt desc)`;
      const data = await client.fetch(query);
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
      {/* Sidebar - Matching the Image */}
      <aside className="w-64 hidden lg:block border-r pr-8">
        <h2 className="font-playfair italic text-3xl text-blue-800 mb-8">Welcome back, Calistus</h2>
        <nav className="space-y-6 text-sm uppercase tracking-widest font-medium">
          <div className="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer"><span>👤</span> Personal Info</div>
          <div className="flex items-center gap-3 text-black bg-blue-50 p-3 rounded-md"><span>📦</span> Order History</div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer"><span>❤️</span> Wishlist</div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer"><span>📍</span> Saved Addresses</div>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-playfair mb-2">Order History</h1>
            <p className="text-gray-500">Manage and track your luxury jewelry acquisitions.</p>
          </div>
          <div className="flex gap-4">
            <button className="border px-6 py-2 text-xs uppercase tracking-widest">Recent</button>
            <button className="border px-6 py-2 text-xs uppercase tracking-widest">Filters</button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-8 border-b mb-8 text-sm font-medium text-gray-400">
          <button className="border-b-2 border-blue-600 pb-4 text-black">All Orders ({orders.length})</button>
          <button className="pb-4">In Progress</button>
          <button className="pb-4">Completed</button>
        </div>

        {/* Order Cards */}
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="border p-8 rounded-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-12 text-xs uppercase tracking-widest font-bold">
                  <div><p className="text-gray-400 mb-1">Order ID</p><p>#{order.reference?.slice(0, 8)}</p></div>
                  <div><p className="text-gray-400 mb-1">Date</p><p>{new Date(order._createdAt).toLocaleDateString()}</p></div>
                  <div><p className="text-gray-400 mb-1">Total</p><p className="text-blue-600">${order.amount.toLocaleString()}</p></div>
                </div>
                <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase">{order.status}</span>
              </div>

              {/* Items in the Order */}
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-6 items-center">
                  <div className="w-24 h-24 bg-gray-50 relative">
                    {item.image && <Image src={urlFor(item.image).url()} alt={item.name} fill className="object-contain p-2" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-playfair text-lg">{item.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Quantity: {item.quantity}</p>
                  </div>
                  <button className="text-blue-600 border-b border-blue-600 text-[10px] uppercase font-bold">Track Package</button>
                  <button className="bg-blue-700 text-white px-6 py-3 text-[10px] uppercase font-bold">View Digital Appraisal</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}