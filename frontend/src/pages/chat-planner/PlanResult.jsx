import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle2, Download, Share2, ChevronDown, ChevronUp, IndianRupee, MapPin, Calendar, Users, Utensils, Palette, Music, Sparkles, Star } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

/* ------------------------------------------------------------------ */
/* Budget bar visualization                                               */
/* ------------------------------------------------------------------ */
function BudgetBar({ label, amount, total, color }) {
  const pct = total > 0 ? Math.min((Number(amount) / Number(total)) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-semibold text-zinc-700 w-20 text-right shrink-0">
        ₹{Number(amount).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Collapsible Section                                                     */
/* ------------------------------------------------------------------ */
function Section({ title, icon, children, defaultOpen = false, color = "text-indigo-600 bg-indigo-50" }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="avy-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
            {icon}
          </div>
          <span className="font-semibold text-zinc-900">{title}</span>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-zinc-400" />
        ) : (
          <ChevronDown size={16} className="text-zinc-400" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-zinc-100 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plan Result Component                                                   */
/* ------------------------------------------------------------------ */
export default function PlanResult({ plan, answers, onReset }) {
  const { user } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const budgetEntries = Object.entries(plan.budget || {}).filter(
    ([k]) => k !== "total"
  );
  const totalBudget = Number(plan.budget?.total || 0);

  const barColors = [
    "bg-indigo-500",
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
  ];

  const handleSave = async () => {
    if (!user || !plan) return;
    setSaving(true);
    try {
      const payload = {
        user: user._id,
        eventType: plan.title,
        guestsBudget: {
          guests: plan.guests || 0,
          budget: plan.budget?.total || 0,
        },
        dateVenue: {
          date: plan.date,
          venue: plan.venue,
        },
        foodTheme: {
          food: plan.food?.join(", ") || "",
          theme: plan.theme?.name || "",
        },
      };

      const res = await axiosInstance.post(
        API_PATHS.EVENT.SAVE_EVENT_DETAILS,
        payload
      );

      if (res.data.success) {
        setSaved(true);
        toast.success("Event saved to your dashboard!");
      } else {
        toast.error("Failed to save. Please try again.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 page-enter">
      {/* Header */}
      <div className="avy-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Your Event Plan
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900">{plan.title}</h1>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {plan.date && (
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Calendar size={14} className="text-zinc-400" />
                  {plan.date}
                </div>
              )}
              {plan.venue && (
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <MapPin size={14} className="text-zinc-400" />
                  {plan.venue}
                </div>
              )}
              {plan.guests && (
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Users size={14} className="text-zinc-400" />
                  {plan.guests} guests
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {saved ? (
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                <CheckCircle2 size={15} />
                Saved
              </div>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving || !user}
                className="btn-primary px-4 py-2 text-sm disabled:opacity-60"
                title={!user ? "Sign in to save" : "Save this event"}
              >
                {saving ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Save size={14} />
                    Save Event
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="avy-card p-6">
        <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <IndianRupee size={16} className="text-emerald-600" />
          Budget Breakdown
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="avy-metric">
            <div className="metric-label">Total Budget</div>
            <div className="metric-value text-lg">
              ₹{Number(plan.budget?.total || 0).toLocaleString("en-IN")}
            </div>
          </div>
          <div className="avy-metric">
            <div className="metric-label">Venue Cost</div>
            <div className="metric-value text-lg">
              ₹{Number(plan.budget?.venue || 0).toLocaleString("en-IN")}
            </div>
          </div>
          <div className="avy-metric">
            <div className="metric-label">Food & Catering</div>
            <div className="metric-value text-lg">
              ₹{Number(plan.budget?.food || 0).toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {budgetEntries.map(([k, v], i) => (
            <BudgetBar
              key={k}
              label={k.charAt(0).toUpperCase() + k.slice(1)}
              amount={v}
              total={totalBudget}
              color={barColors[i % barColors.length]}
            />
          ))}
        </div>
      </div>

      {/* Theme & Decor */}
      {plan.theme && (
        <Section
          title="Theme & Decor"
          icon={<Palette size={16} />}
          color="text-violet-600 bg-violet-50"
          defaultOpen
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="avy-badge">{plan.theme.name}</span>
              {plan.theme.colors?.map((c) => (
                <div
                  key={c}
                  className="w-5 h-5 rounded-full border border-zinc-200"
                  style={{ background: c }}
                  title={c}
                />
              ))}
            </div>
            {plan.theme.decor?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                  Decor
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {plan.theme.decor.map((d) => (
                    <span key={d} className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs rounded-full border border-violet-100">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {plan.theme.lighting?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                  Lighting
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {plan.theme.lighting.map((l) => (
                    <span key={l} className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Food */}
      {plan.food?.length > 0 && (
        <Section
          title="Food & Catering"
          icon={<Utensils size={16} />}
          color="text-amber-600 bg-amber-50"
          defaultOpen
        >
          <div className="flex flex-wrap gap-2">
            {plan.food.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-amber-50 text-amber-800 text-sm rounded-lg border border-amber-100 font-medium">
                {f}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Entertainment */}
      {plan.entertainment?.length > 0 && (
        <Section
          title="Entertainment"
          icon={<Music size={16} />}
          color="text-blue-600 bg-blue-50"
        >
          <ul className="space-y-2">
            {plan.entertainment.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-zinc-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Vendors */}
      {plan.vendors?.length > 0 && (
        <Section
          title="Recommended Vendors"
          icon={<Star size={16} />}
          color="text-emerald-600 bg-emerald-50"
        >
          <div className="space-y-3">
            {plan.vendors.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm text-zinc-900">{v.name}</p>
                  <p className="text-xs text-zinc-400">{v.serviceType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-800">
                    ₹{Number(v.cost).toLocaleString("en-IN")}
                  </p>
                  {v.contact && (
                    <p className="text-xs text-zinc-400">{v.contact}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Next Steps */}
      {plan.nextSteps?.length > 0 && (
        <Section
          title="Next Steps"
          icon={<CheckCircle2 size={16} />}
          color="text-indigo-600 bg-indigo-50"
          defaultOpen
        >
          <ol className="space-y-2">
            {plan.nextSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-700">{s}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Available Options */}
      {plan.availableOptions && (
        <Section
          title="All Available Options"
          icon={<Sparkles size={16} />}
          color="text-zinc-600 bg-zinc-100"
        >
          <div className="space-y-4">
            {[
              { label: "Venues", data: plan.availableOptions.venues },
              { label: "Foods", data: plan.availableOptions.foods },
              { label: "Themes", data: plan.availableOptions.themes },
              { label: "Vendors", data: plan.availableOptions.vendors },
            ]
              .filter((s) => s.data?.length)
              .map(({ label, data }) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-md"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Section>
      )}
    </div>
  );
}
