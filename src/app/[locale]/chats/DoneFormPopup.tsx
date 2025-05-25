import { X } from "lucide-react";

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
}

const DoneFormPopup = ({
  showDoneForm,
  doneFormData,
  isSubmittingDoneForm,
  onClose,
  onFormChange,
  onSubmit,
}: DoneFormPopupProps) => {
  if (!showDoneForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-950">
              Complete Task Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmittingDoneForm}
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={doneFormData.price}
                onChange={(e) => onFormChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                disabled={isSubmittingDoneForm}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={doneFormData.email}
                onChange={(e) => onFormChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                disabled={isSubmittingDoneForm}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={doneFormData.phone}
                onChange={(e) => onFormChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                disabled={isSubmittingDoneForm}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                value={doneFormData.address}
                onChange={(e) => onFormChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
                rows={3}
                disabled={isSubmittingDoneForm}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Completion Date *
              </label>
              <input
                type="date"
                value={doneFormData.date}
                onChange={(e) => onFormChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmittingDoneForm}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isSubmittingDoneForm}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50"
              disabled={isSubmittingDoneForm}
            >
              {isSubmittingDoneForm ? "Submitting..." : "Mark as Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneFormPopup;
