import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Utensils,
  Palette,
  IndianRupee,
  Trash2,
  Plus,
  Sparkles,
  Clock,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Skeleton loader                                                         */
/* ------------------------------------------------------------------ */
function EventSkeleton() {
  return (
    <div className="avy-card p-5 space-y-4">
      <div className="skeleton h-5 w-2/3 rounded" />
      <div className="skeleton h-3 w-1/2 rounded" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
      <div className="skeleton h-8 w-full rounded-lg" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty State                                                             */
/* ------------------------------------------------------------------ */
function EmptyState({ onPlan }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
        <Calendar size={28} className="text-indigo-500" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-2">No saved events yet</h3>
      <p className="text-zinc-500 text-sm max-w-xs mb-6">
        Create your first AI-powered event plan and save it here to manage all details in one place.
      </p>
      <button onClick={onPlan} className="btn-primary px-6 py-2.5">
        <Plus size={15} />
        Create Your First Event
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Delete Confirm Dialog                                                   */
/* ------------------------------------------------------------------ */
function DeleteDialog({ open, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xs bg-white rounded-2xl shadow-2xl p-6 border border-zinc-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="font-bold text-zinc-900 text-center mb-1">
              Delete Event?
            </h3>
            <p className="text-sm text-zinc-500 text-center mb-5">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="btn-secondary flex-1 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin mx-auto" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Event Card                                                              */
/* ------------------------------------------------------------------ */
function EventCard({ plan, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(plan._id);
    setDeleting(false);
    setConfirmDelete(false);
  };

  const details = [
    {
      icon: <Calendar size={13} className="text-zinc-400" />,
      text: plan.dateVenue?.date
        ? new Date(plan.dateVenue.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—",
    },
    {
      icon: <MapPin size={13} className="text-zinc-400" />,
      text: plan.dateVenue?.venue || "—",
    },
    {
      icon: <Users size={13} className="text-zinc-400" />,
      text: `${plan.guestsBudget?.guests || 0} guests`,
    },
    {
      icon: <Utensils size={13} className="text-zinc-400" />,
      text: plan.foodTheme?.food || "—",
    },
    {
      icon: <Palette size={13} className="text-zinc-400" />,
      text: plan.foodTheme?.theme || "—",
    },
  ];

  return (
    <>
      <motion.div
        layout
        className="avy-card p-5 flex flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-zinc-900 text-base leading-tight">
              {plan.eventType}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock size={11} className="text-zinc-300" />
              <span className="text-xs text-zinc-400">
                {new Date(plan.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            <IndianRupee size={11} className="text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              {Number(plan.guestsBudget?.budget || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Detail rows */}
        <div className="space-y-2 flex-1 mb-4">
          {details.map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-2">
              {icon}
              <span className="text-xs text-zinc-600 truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Delete button */}
        <button
          onClick={() => setConfirmDelete(true)}
          className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
        >
          <Trash2 size={13} />
          Delete event
        </button>
      </motion.div>

      <DeleteDialog
        open={confirmDelete}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
        loading={deleting}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Main Dashboard                                                          */
/* ------------------------------------------------------------------ */
const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.EVENT.GET_EVENT_DETAILS);
        setPlans(res.data.events || []);
      } catch (err) {
        setError("Failed to load events. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const res = await axiosInstance.delete(
        `${API_PATHS.EVENT.DELETE_EVENT}/${eventId}`
      );
      if (res.data.success) {
        setPlans(plans.filter((p) => p._id !== eventId));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-white border-b border-zinc-200 sticky top-14 z-20">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 font-medium">{greeting()}</p>
              <h1 className="text-xl font-bold text-zinc-900">
                {user?.name ? `${user.name.split(" ")[0]}'s Events` : "My Events"}
              </h1>
            </div>
            <button
              onClick={() => navigate("/ai-planner-page")}
              className="btn-primary px-4 py-2 text-sm"
            >
              <Plus size={15} />
              New Event
            </button>
          </div>

          {/* Stats row */}
          {!loading && plans.length > 0 && (
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Calendar size={14} className="text-zinc-400" />
                <span>
                  <strong className="text-zinc-900 font-semibold">
                    {plans.length}
                  </strong>{" "}
                  {plans.length === 1 ? "event" : "events"} saved
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <IndianRupee size={14} className="text-zinc-400" />
                <span>
                  Total budget:{" "}
                  <strong className="text-zinc-900 font-semibold">
                    ₹
                    {plans
                      .reduce(
                        (sum, p) =>
                          sum + Number(p.guestsBudget?.budget || 0),
                        0
                      )
                      .toLocaleString("en-IN")}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <EventSkeleton key={i} />
              ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <AlertCircle size={22} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-zinc-900 mb-2">
              Failed to load events
            </h3>
            <p className="text-sm text-zinc-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary px-4 py-2 text-sm"
            >
              Try again
            </button>
          </div>
        ) : plans.length === 0 ? (
          <EmptyState onPlan={() => navigate("/ai-planner-page")} />
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            layout
          >
            <AnimatePresence>
              {plans.map((plan) => (
                <EventCard key={plan._id} plan={plan} onDelete={handleDelete} />
              ))}
            </AnimatePresence>

            {/* Create new card */}
            <motion.button
              onClick={() => navigate("/ai-planner-page")}
              className="avy-card border-dashed border-2 border-zinc-200 p-5 flex flex-col items-center justify-center gap-3 text-zinc-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 min-h-[200px] transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
                <Plus size={20} />
              </div>
              <span className="text-sm font-medium">Plan a new event</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* CTA if no events */}
      {!loading && plans.length === 0 && !error && (
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="bg-indigo-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Create your first event plan
              </h2>
              <p className="text-indigo-200 text-sm">
                Let AI handle the heavy lifting — venues, budgets, timelines and vendors.
              </p>
            </div>
            <button
              onClick={() => navigate("/ai-planner-page")}
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap"
            >
              <Sparkles size={15} />
              Start Planning
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
