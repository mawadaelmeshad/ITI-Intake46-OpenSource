'use client';

import { useActionState } from 'react';
import { submitContactForm } from '@/app/actions';

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <div className="max-w-3xl mx-auto py-16 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight sm:text-6xl mb-4 text-center">
        Get in Touch
      </h1>
      <p className="text-center text-slate-400 mb-12 text-lg font-light">
        We'd love to hear from you. Drop us a message below.
      </p>
      
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 p-10 relative">
        <form action={formAction} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                placeholder="Jane Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-slate-300 ml-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-white placeholder-slate-600 shadow-inner resize-none"
              placeholder="How can we help you today?"
              required
            ></textarea>
          </div>

          {state?.error && (
            <div className="p-4 bg-red-950/30 border border-red-500/30 text-red-400 rounded-xl flex items-start gap-3 backdrop-blur-sm">
              <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="font-medium mt-0.5">{state.error}</p>
            </div>
          )}

          {state?.success && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-start gap-3 backdrop-blur-sm">
              <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="font-medium mt-0.5">{state.success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_30px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.6)] disabled:opacity-70 disabled:cursor-not-allowed border border-indigo-500/50"
          >
            {isPending ? (
              <span className="flex items-center justify-center relative z-10">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </span>
            ) : (
              <span className="relative z-10 text-lg">Send Message</span>
            )}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </form>
      </div>
    </div>
  );
}
