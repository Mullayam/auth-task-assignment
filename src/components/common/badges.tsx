
const STATUS_CLASSES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800  ",
  INACTIVE: "bg-gray-100 text-gray-800  ",
  BANNED: "bg-red-100 text-red-800 ",
  DELETED: "bg-gray-100 text-gray-800  ",
  PENDING: "bg-yellow-100 text-yellow-800  ",
  SUSPENDED: "bg-indigo-100 text-indigo-800  ",
  BLOCKED: "bg-purple-100 text-purple-800 ",
};

type Status = keyof typeof STATUS_CLASSES;

const Badge = ({ status }: { status: Status }) => {
  return (
    <span
      className={`text-sm font-medium px-2.5 py-0.5 rounded ${STATUS_CLASSES[status]}`}
    >
      {status}
    </span>
  );
};

export default Badge;
