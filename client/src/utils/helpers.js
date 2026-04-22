// client/src/utils/helpers.js

export const formatDateTime = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const truncateText = (text, maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
};

export const capitalizeText = (value = "") => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};