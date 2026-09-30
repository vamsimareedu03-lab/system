import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { state } = useCart();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/category/all${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
    setMenu(false);
  };

  const links = [
    ["Women", "/category/women"],
    ["Men", "/category/men"],
    ["Kids", "/category/kids"],
    ["New Styles", "/category/all"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white shadow-xl backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link to="/" className="group flex items-center gap-2" onClick={() => setMenu(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-500 shadow-lg shadow-violet-900/30"><Sparkles className="h-5 w-5" /></div>
            <div><div className="text-lg font-bold tracking-tight">VITON</div><div className="-mt-1 text-[9px] uppercase tracking-[.25em] text-slate-400">AI fashion studio</div></div>
          </Link>

          <nav className="ml-6 hidden items-center gap-5 lg:flex">
            {links.map(([label,href]) => <Link key={label} to={href} className="text-sm text-slate-300 transition hover:text-white">{label}</Link>)}
            <Link to="/try-on" className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-fuchsia-900/20"><Sparkles className="h-3.5 w-3.5" /> Try-On</Link>
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden w-64 items-center rounded-full border border-white/10 bg-white/5 px-3 md:flex">
            <Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search styles..." className="h-9 w-full bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500" />
          </form>

          <Button variant="ghost" size="icon" className="hidden text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex" onClick={() => navigate('/try-on')} aria-label="Open virtual try-on"><UserRound /></Button>
          <Button variant="ghost" size="icon" className="relative text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => setCart(true)} aria-label="Open cart"><ShoppingBag />{state.items.length > 0 && <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-fuchsia-500 px-1 text-[10px]">{state.items.length}</Badge>}</Button>
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => setMenu(v => !v)} aria-label="Open menu">{menu ? <X /> : <Menu />}</Button>
        </div>

        {menu && <div className="border-t border-white/10 py-4 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 flex items-center rounded-xl border border-white/10 bg-white/5 px-3"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search styles..." className="h-10 w-full bg-transparent px-2 text-sm outline-none placeholder:text-slate-500" /></form>
          <div className="grid grid-cols-2 gap-2">{links.map(([label,href]) => <Link key={label} to={href} onClick={() => setMenu(false)} className="rounded-xl bg-white/5 p-3 text-sm font-medium">{label}</Link>)}<Link to="/try-on" onClick={() => setMenu(false)} className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 p-3 text-sm font-semibold">✨ Virtual Try-On</Link></div>
        </div>}
      </div>
      <CartDrawer open={cart} onClose={() => setCart(false)} onCheckout={() => setCheckout(true)} />
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </header>
  );
};

export default Header;
