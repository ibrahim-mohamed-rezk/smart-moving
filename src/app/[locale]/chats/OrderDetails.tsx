import { TaskTypes } from "@/libs/types/types";
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useTranslations } from "next-intl";

const OrderDetails = ({ order }: { order: TaskTypes }) => {
  const t = useTranslations("order_details");

  if (!order) return null;

  return (
    <div className="w-full bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">{t("title")}</h3>
      <div className="grid gap-3">
        {order.details.title && (
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("service_type")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details.title)}
              </p>
            </div>
          </div>
        )}
        {order.details["services.description"] && (
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("description")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.description"])}
              </p>
            </div>
          </div>
        )}
        {order.details["services.FRA_address"] && (
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("from_address")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.FRA_address"])}
              </p>
              {order.details["services.Address_possibly_floor"] && (
                <p className="text-sm text-gray-500 mt-1">
                  {t("floor")}:{" "}
                  {String(order.details["services.Address_possibly_floor"])}
                </p>
              )}
            </div>
          </div>
        )}
        {order.details.moving_address?.["services.to_address"] && (
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("to_address")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details.moving_address["services.to_address"])}
              </p>
              {order.details.moving_address[
                "services.Address_possibly_floor"
              ] && (
                <p className="text-sm text-gray-500 mt-1">
                  {t("floor")}:{" "}
                  {String(
                    order.details.moving_address[
                      "services.Address_possibly_floor"
                    ]
                  )}
                </p>
              )}
            </div>
          </div>
        )}
        {order.details["services.when_do_want_begin"] && (
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("start_time")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.when_do_want_begin"])}
              </p>
            </div>
          </div>
        )}
        {order.details.moving_address?.["تاريخ البدء"] && (
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("start_date")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details.moving_address["تاريخ البدء"])}
              </p>
            </div>
          </div>
        )}
        {order.details["services.service_level"] && (
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("service_level")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.service_level"])}
              </p>
            </div>
          </div>
        )}
        {order.details["services.furnishing"] && (
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("furnishing")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.furnishing"])}
              </p>
            </div>
          </div>
        )}
        {order.details["services.parking_distance_to_door"] && (
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("parking_distance")}
              </p>
              <p className="text-sm text-gray-600">
                {String(order.details["services.parking_distance_to_door"])}
              </p>
            </div>
          </div>
        )}
        {order.offers?.[0]?.offer && (
          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
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
