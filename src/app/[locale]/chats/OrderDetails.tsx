import { TaskTypes } from "@/libs/types/types";
import {
  Package,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Building,
  Car,
  ClipboardList,
  Info,
  Tag,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import Mony from "./Mony";
import OfficeBuilding from "./OfficeBuilding";

const OrderDetails = ({ order }: { order: TaskTypes }) => {
  const t = useTranslations("order_details");
  const st = useTranslations("myprofile");

  if (!order) return null;

  const getIconForField = (
    key: string
  ): {
    Icon:
      | React.ComponentType<React.SVGProps<SVGSVGElement>>
      | React.FC<React.ImgHTMLAttributes<HTMLImageElement>>;
    color: string;
    tooltip: string;
  } => {
    if (
      key.includes("address") ||
      key.includes("government") ||
      key.includes("city") ||
      key.includes("Address")
    )
      return { Icon: MapPin, color: "text-blue-500", tooltip: "Address" };
    if (key.includes("when") || key.includes("date") || key.includes("تاريخ"))
      return { Icon: Calendar, color: "text-green-500", tooltip: "Date" };
    if (key.includes("offer") || key.includes("price"))
      return { Icon: Mony, color: "text-yellow-500", tooltip: "Price" };
    if (key.includes("name") || key.includes("user"))
      return { Icon: User, color: "text-purple-500", tooltip: "User" };
    if (key.includes("phone"))
      return { Icon: Phone, color: "text-pink-500", tooltip: "Phone" };
    if (key.includes("email"))
      return { Icon: Mail, color: "text-red-500", tooltip: "Email" };
    if (key.includes("company"))
      return { Icon: Building, color: "text-indigo-500", tooltip: "Company" };
    if (key.includes("car"))
      return { Icon: Car, color: "text-orange-500", tooltip: "Car" };
    if (key.includes("task") || key.includes("service"))
      return {
        Icon: ClipboardList,
        color: "text-teal-500",
        tooltip: "Task/Service",
      };
    if (key.includes("info") || key.includes("description"))
      return { Icon: Info, color: "text-gray-500", tooltip: "Info" };
    if (key.includes("type") || key.includes("category"))
      return { Icon: Tag, color: "text-lime-500", tooltip: "Type/Category" };
    if (key.includes("file") || key.includes("document"))
      return { Icon: FileText, color: "text-cyan-500", tooltip: "File" };
    return { Icon: Package, color: "text-gray-400", tooltip: "Other" };
  };

  const formatKey = (key: string): string => {
    return (
      key
        .replace(/services\./g, "")
        .replace(/_/g, " ")
        .split(".")
        .pop() || key
    );
  };

  const renderDetails = (
    details: Record<string, unknown>,
    prefix = ""
  ): ReactNode[] => {
    return Object.entries(details).map(([key, value]) => {
      if (value === null || value === undefined) return null;

      if (typeof value === "object" && !Array.isArray(value)) {
        return renderDetails(
          value as Record<string, unknown>,
          `${prefix}${key}.`
        );
      }

      const { Icon, color, tooltip } = getIconForField(key);
      const displayKey = formatKey(key);

      return (
        <div key={key} className="flex items-start gap-2">
          <span title={tooltip}>
            <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {st(displayKey) || displayKey}
            </p>
            <p className="text-sm text-gray-600">{String(value)}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800 tracking-tight flex items-center gap-2">
        <span className="inline-block w-2 h-6 mr-2" />
        {t("title")}
      </h3>
      <div className="grid gap-4">
        {renderDetails(order.details)}
        {order.offers?.[0] && (
          <>
            <div className="flex items-center gap-3">
              <span title={t("price")} className="flex-shrink-0">
                <Mony className="w-6 h-6 text-yellow-500 mt-0.5 drop-shadow" />
              </span>
              <p className="text-base font-semibold text-yellow-700 mb-0">
                {t("price")}
              </p>
              <p className="text-base text-gray-700 font-mono mb-0">
                {String(order.offers[0].offer)}{" "}
                <span className="font-bold">Kr</span>
              </p>
            </div>
            {order.offers[0].company && (
              <div className="flex items-center gap-2 mt-2">
                <span title={t("company")} className="flex-shrink-0">
                  <OfficeBuilding className="w-5 h-5 text-yellow-500 mt-0.5" />
                </span>
                <p className="text-sm text-gray-600 font-medium mb-0">
                  <span className="text-gray-500">{t("company")}:</span>{" "}
                  {order.offers[0].company.name}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
