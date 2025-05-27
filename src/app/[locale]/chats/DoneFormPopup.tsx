import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface DoneFormData {
  price: string;
  email: string;
  phone: string;
  address: string;
  date: string;
}

interface DoneFormPopupProps {
  showDoneForm: boolean;
  doneFormData: DoneFormData;
  isSubmittingDoneForm: boolean;
  onClose: () => void;
  onFormChange: (field: keyof DoneFormData, value: string) => void;
  onSubmit: () => void;
  status?: string;
}

const DoneFormPopup = ({
  showDoneForm,
  doneFormData,
  isSubmittingDoneForm,
  onClose,
  onFormChange,
  onSubmit,
  status = "done",
}: DoneFormPopupProps) => {
  const t = useTranslations("doneForm");

  if (!showDoneForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-950">
              {t(`title.${status}`)}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmittingDoneForm}
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("price")}
              </label>
              <input
                type="text"
                id="price"
                value={doneFormData.price}
                onChange={(e) => onFormChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                value={doneFormData.email}
                onChange={(e) => onFormChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("phone")}
              </label>
              <input
                type="tel"
                id="phone"
                value={doneFormData.phone}
                onChange={(e) => onFormChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("address")}
              </label>
              <textarea
                id="address"
                value={doneFormData.address}
                onChange={(e) => onFormChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("date")}
              </label>
              <input
                type="date"
                id="date"
                value={doneFormData.date}
                onChange={(e) => onFormChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                disabled={isSubmittingDoneForm}
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmittingDoneForm}
              >
                {isSubmittingDoneForm
                  ? t("submit.submitting")
                  : t(`submit.processing`)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoneFormPopup;
