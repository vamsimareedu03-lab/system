import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Check, ChevronRight, Loader2, Sparkles, Shirt, UserRound, UsersRound, Baby, Upload, WandSparkles } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/config/api";
import { fetchCatalog, Product } from "@/lib/catalog";

type Profile = "women" | "men" | "kids";

const profiles = [
  { id: "women" as Profile, label: "Women", icon: UserRound, gradient: "from-fuchsia-500 to-violet-600" },
  { id: "men" as Profile, label: "Men", icon: UsersRound, gradient: "from-cyan-500 to-blue-600" },
  { id: "kids" as Profile, label: "Kids", icon: Baby, gradient: "from-amber-400 to-orange-500" },
];

const TryOn = () => {
  const [profile, setProfile] = useState<Profile>("women");
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCatalog().then(data => setProducts(data.products)).catch(err => setError(err.message || "Catalog unavailable"));
  }, []);

  const featured = useMemo(() => products.slice(0, 12), [products]);

  const handlePhoto = (file?: File) => {
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const runTryOn = async () => {
    if (!photo || !selected) { setError("Upload your photo and choose an outfit first."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const body = new FormData();
      body.append("model_image", photo);
      body.append("cloth_image", selected.fileName);
      body.append("garment_description", `${profile} ${selected.name}`);
      const response = await fetch(apiUrl("/api/tryon"), { method: "POST", body });
      const data = await response.json();
      if (!response.ok || data.status !== "success") throw new Error(data.message || "Virtual try-on failed.");
      setResult(data.output_image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Virtual try-on failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="pt-20">
        <section className="relative overflow-hidden px-6 py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,70,239,.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,.25),transparent_30%),linear-gradient(135deg,#0f1020,#17112c 55%,#071b2c)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur"><Sparkles className="h-4 w-4 text-fuchsia-300" /> AI Virtual Fitting Room</div>
              <h1 className="text-5xl font-bold leading-tight md:text-7xl">Try the outfit.<br /><span className="gradient-text">See your look.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Upload a clear full-body photo, choose a garment, and send it to the VTON engine for a personalized preview.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-7 flex items-center justify-between"><div><p className="text-sm text-fuchsia-300">STEP 1</p><h2 className="text-2xl font-semibold">Choose who is trying it on</h2></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">Profile</span></div>
              <div className="grid grid-cols-3 gap-3">
                {profiles.map(({id,label,icon:Icon,gradient}) => <button key={id} onClick={() => setProfile(id)} className={`rounded-2xl border p-4 text-left transition ${profile===id ? "border-white/50 bg-white/15 ring-2 ring-fuchsia-400/40" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}><Icon /></div><span className="font-semibold">{label}</span><span className="mt-1 block text-xs text-slate-400">AI fitting profile</span></button>)}
              </div>

              <div className="mt-8"><p className="mb-3 text-sm text-fuchsia-300">STEP 2</p><label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-black/20 p-6 text-center hover:border-fuchsia-400/60">
                {preview ? <img src={preview} alt="Uploaded person" className="max-h-56 rounded-xl object-contain" /> : <><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600"><Camera /></div><strong>Upload your photo</strong><span className="mt-2 text-sm text-slate-400">JPG or PNG · clear full-body photo works best</span></>}
                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e => handlePhoto(e.target.files?.[0])} />
              </label></div>

              <div className="mt-8"><p className="mb-3 text-sm text-fuchsia-300">STEP 3</p><div className="grid max-h-72 grid-cols-3 gap-3 overflow-y-auto pr-1">
                {featured.map(product => <button key={product.fileName} onClick={() => setSelected(product)} className={`overflow-hidden rounded-2xl border text-left transition ${selected?.fileName===product.fileName ? "border-fuchsia-400 ring-2 ring-fuchsia-400/30" : "border-white/10 hover:border-white/30"}`}><img src={product.clothImage} alt={product.name} className="aspect-[3/4] w-full bg-white object-cover" /><div className="bg-white/5 p-2"><p className="truncate text-xs font-medium">{product.name}</p><p className="truncate text-[11px] text-slate-400">{product.color || product.itemType}</p></div></button>)}
              </div></div>

              {error && <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
              <Button onClick={runTryOn} disabled={loading || !selected || !photo} className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-base font-semibold hover:opacity-90">{loading ? <><Loader2 className="mr-2 animate-spin" /> Creating your look...</> : <><WandSparkles className="mr-2" /> Try This Outfit</>}</Button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.03] p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between"><div><p className="text-sm text-cyan-300">LIVE PREVIEW</p><h2 className="text-2xl font-semibold">Your virtual look</h2></div>{selected && <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs text-fuchsia-200">{selected.name}</span>}</div>
              <div className="flex min-h-[560px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,.25),transparent_40%),linear-gradient(145deg,#111322,#0b1721)] p-5">
                {result ? <div className="w-full"><img src={result} alt="Virtual try-on result" className="mx-auto max-h-[620px] rounded-2xl object-contain shadow-2xl" /><div className="mt-5 flex justify-center gap-3"><Button variant="outline" onClick={() => setResult(null)} className="border-white/20 bg-white/5 text-white hover:bg-white/10">Try another outfit</Button><Button asChild className="bg-white text-slate-900 hover:bg-white/90"><Link to="/category/all">Explore collection <ChevronRight /></Link></Button></div></div> : <div className="max-w-sm text-center"><div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500/30 via-violet-500/30 to-cyan-500/30"><Shirt className="h-9 w-9 text-fuchsia-200" /></div><h3 className="text-2xl font-semibold">Ready when you are</h3><p className="mt-3 text-slate-400">Your generated outfit will appear here after the VTON backend finishes processing.</p><div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-400"><span className="rounded-xl bg-white/5 p-3">📸 Upload</span><span className="rounded-xl bg-white/5 p-3">👕 Select</span><span className="rounded-xl bg-white/5 p-3">✨ Generate</span></div></div>}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-slate-400"><div className="rounded-xl bg-white/5 p-3"><Check className="mx-auto mb-1 h-4 w-4 text-emerald-400" />Simple upload</div><div className="rounded-xl bg-white/5 p-3"><Check className="mx-auto mb-1 h-4 w-4 text-emerald-400" />AI garment swap</div><div className="rounded-xl bg-white/5 p-3"><Check className="mx-auto mb-1 h-4 w-4 text-emerald-400" />Result preview</div></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TryOn;
