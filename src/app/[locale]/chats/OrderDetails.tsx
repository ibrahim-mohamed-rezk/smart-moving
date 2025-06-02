import { TaskTypes } from "@/libs/types/types";
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const OrderDetails = ({ order }: { order: TaskTypes }) => {
  const t = useTranslations("order_details");
  const st = useTranslations("myprofile");

  if (!order) return null;


  const getIconForField = (key: string): LucideIcon => {
    if (key.includes("address") || key.includes("parking")) return MapPin;
    if (key.includes("when") || key.includes("date") || key.includes("تاريخ"))
      return Calendar;
    if (key.includes("offer") || key.includes("price")) return DollarSign;
    return Package;
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

      const Icon = getIconForField(key);
      const displayKey = formatKey(key);

      return (
        <div key={key} className="flex items-start gap-2">
          <Icon className="w-5 h-5 text-gray-500 mt-0.5" />
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
    <div className="w-full bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">{t("title")}</h3>
      <div className="grid gap-3">
        {renderDetails(order.details)}
        {order.offers?.[0] && (
          <div className="flex items-start gap-2">
            <img src="/images/money.svg" alt="Money" className="w-4 h-4" />
            <div>
              <p className="text-sm font-medium text-gray-900">{t("price")}</p>
              <p className="text-sm text-gray-600">
                {String(order.offers[0].offer)}
              </p>
              {order.offers[0].company && (
                <p className="text-sm text-gray-500 mt-1">
                  {t("company")}: {order.offers[0].company.name}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
