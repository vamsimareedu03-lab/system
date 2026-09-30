import { Link } from "react-router-dom";
import { ArrowRight, Camera, Heart, Palette, Rotate3D, Search, Shirt, Sparkles, Star, UsersRound, WandSparkles, Baby, UserRound, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const personas = [
  { title: "Women", text: "Dresses, tops, skirts & occasion looks", icon: UserRound, gradient: "from-fuchsia-500 via-pink-500 to-orange-400", href: "/category/women" },
  { title: "Men", text: "Shirts, jackets, casual & formal fits", icon: UsersRound, gradient: "from-cyan-500 via-blue-500 to-indigo-600", href: "/category/men" },
  { title: "Kids", text: "Fun, colourful styles for little trendsetters", icon: Baby, gradient: "from-amber-400 via-orange-500 to-rose-500", href: "/category/kids" },
];

const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Camera, title: "Photo Try-On", text: "Upload one clear photo and preview an outfit." },
  { icon: Sparkles, title: "AI Recommendations", text: "Discover looks based on colour, style and occasion." },
  { icon: Palette, title: "Style Filters", text: "Explore colours, prints, lengths and silhouettes." },
  { icon: Rotate3D, title: "360° Preview", text: "Ready for a deeper backend integration with 360 video." },
];

const Index = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Header />
    <main>
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(217,70,239,.30),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(6,182,212,.28),transparent_30%),radial-gradient(circle_at_55%_90%,rgba(245,158,11,.15),transparent_30%),linear-gradient(135deg,#0b1020,#17112b 52%,#071d2b)]" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur"><Sparkles className="h-4 w-4 text-fuchsia-300" /> AI-powered fashion studio</div>
            <h1 className="hero-text text-white">Wear it.<br /><span className="gradient-text">Before you buy it.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">A colourful virtual fashion experience for women, men and children. Discover outfits, get AI recommendations and try selected garments on your own photo.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 px-7 text-base font-semibold shadow-lg shadow-violet-900/30 hover:opacity-90"><Link to="/try-on"><WandSparkles className="mr-2" /> Start Virtual Try-On</Link></Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-white hover:bg-white/10"><Link to="/category/all">Explore Fashion <ArrowRight className="ml-2" /></Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400"><span>✦ AI styling</span><span>✦ Women · Men · Kids</span><span>✦ Smart catalog</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg fade-in-up fade-in-up-delay-1">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[2rem] bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-500 p-1">
                <div className="rounded-[1.85rem] bg-slate-950 p-6">
                  <div className="mb-5 flex items-center justify-between"><span className="text-sm font-semibold">YOUR STYLE LAB</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">LIVE AI</span></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-gradient-to-br from-pink-500/30 to-orange-400/10 p-5"><Shirt className="mb-16 h-9 w-9 text-pink-300" /><p className="font-semibold">Outfit swap</p><p className="mt-1 text-xs text-slate-400">See the look on you</p></div>
                    <div className="rounded-3xl bg-gradient-to-br from-cyan-500/30 to-blue-600/10 p-5"><Heart className="mb-16 h-9 w-9 text-cyan-300" /><p className="font-semibold">Smart picks</p><p className="mt-1 text-xs text-slate-400">Find your next favourite</p></div>
                    <div className="col-span-2 rounded-3xl bg-gradient-to-r from-amber-400/20 to-fuchsia-500/20 p-5"><div className="flex items-center gap-3"><Star className="text-amber-300" /><div><p className="font-semibold">Personal style score</p><p className="text-xs text-slate-400">Built for experimentation, not perfection.</p></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.25em] text-fuchsia-300">Shop for everyone</p><h2 className="section-heading mt-2 text-white">Pick your fashion world</h2></div><Link to="/category/all" className="text-sm text-slate-300 hover:text-white">View all styles →</Link></div>
          <div className="grid gap-5 md:grid-cols-3">
            {personas.map(({title,text,icon:Icon,gradient,href}) => <Link to={href} key={title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-white/20"><div className={`mb-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}><Icon className="h-7 w-7" /></div><h3 className="text-3xl font-semibold">{title}</h3><p className="mt-2 max-w-xs text-slate-400">{text}</p><div className="mt-6 flex items-center text-sm font-semibold">Explore <ArrowRight className="ml-2 h-4 transition group-hover:translate-x-1" /></div></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.25em] text-cyan-300">Everything in one place</p><h2 className="section-heading mt-2 text-white">More than a product catalogue</h2><p className="mx-auto mt-4 max-w-2xl text-slate-400">Designed around the complete fashion journey — discover, compare, try on and refine your look.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({icon: Icon,title,text}) => <div key={title} className="rounded-3xl border border-white/10 bg-white/[.05] p-6 transition hover:bg-white/[.08]"><Icon className="h-7 w-7 text-fuchsia-300" /><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 p-[1px] shadow-2xl"><div className="rounded-[1.95rem] bg-slate-950 px-7 py-12 text-center md:px-14"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><Search /></div><h2 className="mt-6 text-4xl font-semibold">Ready to see yourself in a new look?</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Choose a profile, upload a photo and select a garment from the catalogue.</p><Button asChild className="mt-8 rounded-full bg-white px-8 text-slate-950 hover:bg-white/90"><Link to="/try-on">Open Virtual Fitting Room <ArrowRight className="ml-2" /></Link></Button></div></div>
      </section>
    </main>
  </div>
);

export default Index;
