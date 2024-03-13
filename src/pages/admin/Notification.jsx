/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Notification = ({ notifications }) => {
  return (
    <section>
      <h1 className="my-2 text-2xl font-semibold">Notifications</h1>
      <div className="max-w-2xl">
        {notifications.length === 0 && (
          <p className="font-medium text-red-500">No notifications yet.</p>
        )}
        {notifications.map((item) => (
          <div
            key={item._id}
            className="p-2 mb-2 bg-white rounded-md shadow-lg"
          >
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(item.createdAt))} ago ...
            </p>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p>{item.message}</p>
            <p className="pb-2">
              Contact -{" "}
              <span className="tracking-wide">{item.phone_number}</span>{" "}
            </p>
            <hr />
            <div className="text-right">
              <Link
                to={`/product/${item.product_id}`}
                className="font-medium text-blue-500"
              >
                View comment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notification;
