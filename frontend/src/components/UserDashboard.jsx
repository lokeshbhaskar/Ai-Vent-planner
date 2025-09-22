import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import {
  IndianRupee,
  Calendar,
  MapPin,
  Users,
  Utensils,
  Palette,
} from "lucide-react";

const UserDashboard = ({ token }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.EVENT.GET_EVENT_DETAILS);
        // console.log(res.data);
        setPlans(res.data.events || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token]);
  const handleDelete = async (eventId) => {
    try {
      const res = await axiosInstance.delete(
        `${API_PATHS.EVENT.DELETE_EVENT}/${eventId}`
      );
      if (res.data.success) {
        setPlans(plans.filter((plan) => plan._id !== eventId));
      }
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (!plans.length)
    return (
      <p className="text-center mt-10 text-gray-500">No saved plans yet.</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700 text-center">
        🎉 My Saved Event Plans
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              {plan.eventType}
            </h2>
            {/* Details */}
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <Calendar size={18} className="text-indigo-500" />
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(plan.dateVenue.date).toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-pink-500" />
                <span>
                  <strong>Venue:</strong> {plan.dateVenue.venue}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Utensils size={18} className="text-green-500" />
                <span>
                  <strong>Food:</strong> {plan.foodTheme.food}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Palette size={18} className="text-purple-500" />
                <span>
                  <strong>Theme:</strong> {plan.foodTheme.theme}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Users size={18} className="text-blue-500" />
                <span>
                  <strong>Guests:</strong> {plan.guestsBudget.guests}
                </span>
              </p>
              <p className="flex items-center gap-2 text-lg font-medium text-emerald-600">
                <IndianRupee size={18} />
                {plan.guestsBudget.budget}
              </p>
            </div>
            <button onClick={()=>handleDelete(plan._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 w-full transition cursor-pointer">
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
