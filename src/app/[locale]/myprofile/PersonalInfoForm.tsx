"use client";
import { useState, useRef } from "react";
// import { useTranslations } from "next-intl";
import { UserDataTypes } from "@/libs/types/types";
import { UserIcon, Camera, Edit } from "lucide-react";
import { postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";

const PersonalInfoForm = ({
  initialData,
  token,
}: {
  initialData: UserDataTypes;
  token: string;
}) => {
  // const t = useTranslations("company");

  // Form state with validation
  const [formData, setFormData] = useState({
    ...initialData,
    first_name: initialData.name?.split(" ")[0],
    sur_name: initialData.name?.split(" ")[1],
    price_listings: initialData.company?.price_listings || '',
    bio: initialData.company?.bio || '',
  });

  // Profile image state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    initialData.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation state
  const [errors, setErrors] = useState({
    first_name: "",
    sur_name: "",
    email: "",
    phone: "",
    code: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<
    string | undefined
  >();
  const [sendingCode, setSendingCode] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset verification when phone changes
    if (name === "phone") {
      setShowVerification(false);
      setVerificationCode("");
    }
  };

  // Handle profile image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle sending verification code
  const handleSendVerificationCode = async () => {
    // Validate phone number first
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid phone number (10-15 digits)",
      }));
      return;
    }

    setSendingCode(true);
    try {
      await postData(
        `${initialData.role}/send-verfiy-api`,
        { phone: formData.phone },
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      setShowVerification(true);
      toast.success("Verification code sent to your phone");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    } finally {
      setSendingCode(false);
    }
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      first_name: "",
      sur_name: "",
      email: "",
      phone: "",
      code: "",
    };

    // First name validation
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
      valid = false;
    }

    // Last name validation
    if (!formData.sur_name?.trim()) {
      newErrors.sur_name = "Last name is required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      valid = false;
    }

    // Verification code validation if shown
    if (showVerification && !verificationCode?.trim()) {
      newErrors.code = "Verification code is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setSubmitSuccess(false);
    setSubmitError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for multipart submission
      const submitData = new FormData();

      // Add form fields
      submitData.append("first_name", formData.first_name || "");
      submitData.append("sur_name", formData.sur_name || "");
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("bio", formData.bio || "");
      submitData.append("price_listings", formData.price_listings || "");

      if (verificationCode) {
        submitData.append("code", verificationCode);
      }

      // Add profile image if selected
      if (profileImage) {
        submitData.append("image", profileImage);
      }

      const response = await postData(
        `${initialData.role}/update-profile-api`,
        submitData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      // Update user in cookies
      if (response.data) {
        document.cookie = `user=${JSON.stringify(response.data)}; path=/`;
        // Reload the window to reflect updated user data
        window.location.reload();
      }

      // Mock successful save
      toast.success("Profile updated successfully");
      setSubmitSuccess(true);

      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col justify-center items-start gap-8 md:gap-12"
    >
      {/* Header - Profile Image and Name */}
      <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-6 md:gap-12">
        <div
          className="w-32 h-32 md:w-44 md:h-44 mx-auto md:mx-0 relative bg-white rounded-full outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex items-center justify-center cursor-pointer group"
          onClick={handleImageClick}
        >
          {profileImageUrl ? (
            typeof profileImageUrl === "string" &&
            profileImageUrl.match(/\.(jpeg|jpg|gif|png|webp)$|blob:http/i) ? (
              <div className="relative w-full h-full">
                <img
                  src={profileImageUrl.toString()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                  <Edit className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
                <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                  <Edit className="w-4 h-4 text-white" />
                </div>
              </div>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
              <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                <Edit className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="p-2.5 flex flex-col justify-center items-center sm:items-start gap-5">
          <div className="text-black text-3xl md:text-5xl font-bold font-['Libre_Baskerville'] text-center sm:text-left">
            {formData.name}
          </div>
          <div className="text-black/60 text-base md:text-lg font-bold font-['Libre_Baskerville']">
            {formData.email}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="self-stretch px-2 sm:px-6 py-2.5 flex flex-col justify-center items-end gap-8 md:gap-14 w-full">
        <div className="self-stretch flex flex-col justify-center items-end gap-6 md:gap-10 w-full">
          {/* Name Fields */}
          <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-6 md:gap-12 w-full">
            <div className="flex-1 flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                First Name
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                    errors.first_name
                      ? "outline-red-500"
                      : "outline-1 outline-offset-[-1px] outline-zinc-300"
                  } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errors.first_name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                Last Name
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="sur_name"
                  value={formData.sur_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                    errors.sur_name
                      ? "outline-red-500"
                      : "outline-1 outline-offset-[-1px] outline-zinc-300"
                  } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                />
                {errors.sur_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errors.sur_name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
            <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
              Email
            </div>
            <div className="self-stretch relative w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                  errors.email
                    ? "outline-red-500"
                    : "outline-1 outline-offset-[-1px] outline-zinc-300"
                } w-full text-black text-base md:text-lg font-bold font-['Libre_Baskerville']`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
            <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
              Phone number
            </div>
            <div className="self-stretch relative w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                      errors.phone
                        ? "outline-red-500"
                        : "outline-1 outline-offset-[-1px] outline-zinc-300"
                    } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {errors.phone}
                    </p>
                  )}
                </div>
                {formData.phone !== initialData.phone && (
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={sendingCode}
                    className={`h-12 md:h-16 px-4 sm:px-6 bg-blue-950 rounded-3xl flex justify-center items-center transition-all ${
                      sendingCode
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-900"
                    }`}
                  >
                    <span className="text-white text-sm md:text-base font-normal font-['Libre_Baskerville']">
                      {sendingCode ? "Sending..." : "Verify Phone"}
                    </span>
                  </button>
                )}
              </div>

              {/* Verification Code Input */}
              {showVerification && (
                <div className="mt-3">
                  <div className="self-stretch text-blue-950 text-base font-bold font-['Libre_Baskerville'] mb-1">
                    Verification Code
                  </div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                      errors.code
                        ? "outline-red-500"
                        : "outline-1 outline-offset-[-1px] outline-zinc-300"
                    } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {errors.code}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* company bio */}
          {initialData.role === "company" && (
            <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                Company Bio
              </div>
              <div className="self-stretch relative w-full">
                <div className="flex-1 relative">
                  <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    className={`self-stretch p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville'] min-h-[120px]`}
                    placeholder="Tell us about your company..."
                    minLength={100}
                  >
                    {formData.bio || ""}
                  </textarea>
                </div>
              </div>
            </div>
          )}

          {/* Price Listings */}
          {initialData.role === "company" && (
            <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                Price Listings
              </div>
              <div className="self-stretch w-full space-y-4">
                {formData.price_listings?.split(',').map((item, index) => {
                  const [title, price] = item.split(':').map(i => i.trim());
                  return (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={title || ''}
                          onChange={(e) => {
                            const newListings = formData.price_listings?.split(',').map((i, idx) => 
                              idx === index ? `${e.target.value}:${item.split(':')[1] || ''}` : i
                            ).join(',');
                            setFormData(prev => ({ ...prev, price_listings: newListings }));
                          }}
                          className="p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']"
                          placeholder="Service title (e.g., 1 man with van - approx. 10 m3)"
                        />
                      </div>
                      <div className="w-full sm:w-1/3">
                        <input
                          type="text"
                          value={price || ''}
                          onChange={(e) => {
                            const newListings = formData.price_listings?.split(',').map((i, idx) => 
                              idx === index ? `${item.split(':')[0] || ''}:${e.target.value}` : i
                            ).join(',');
                            setFormData(prev => ({ ...prev, price_listings: newListings }));
                          }}
                          className="p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']"
                          placeholder="Price (e.g., 700$)"
                        />
                      </div>
                    </div>
                  );
                })}
                
                <button
                  type="button"
                  onClick={() => {
                    const currentListings = formData.price_listings || '';
                    const newListing = currentListings ? `${currentListings}, :` : ':';
                    setFormData(prev => ({ ...prev, price_listings: newListing }));
                  }}
                  className="px-4 py-2 bg-blue-950 rounded-xl text-white font-normal font-['Libre_Baskerville'] hover:bg-blue-900 transition-all"
                >
                  Add Price Listing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {submitSuccess && (
          <div className="self-stretch bg-green-100 text-green-800 p-3 rounded-lg mb-4">
            Profile information updated successfully!
          </div>
        )}

        {submitError && (
          <div className="self-stretch bg-red-100 text-red-800 p-3 rounded-lg mb-4">
            {submitError}
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-8 md:px-36 py-3 md:py-4 bg-blue-950 rounded-xl md:rounded-2xl flex justify-center items-center gap-2 mt-4 transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-900"
          }`}
        >
          <div className="text-white text-lg md:text-xl font-normal font-['Libre_Baskerville']">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </div>
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
