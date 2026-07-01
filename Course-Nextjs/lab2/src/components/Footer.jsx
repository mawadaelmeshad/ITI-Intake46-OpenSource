export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} NextStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
