import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {/* Avatar Section */}
          <div className="flex flex-col items-center py-8 px-6 border-b border-gray-100">
            <div className="relative group">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
              />
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-200 group-hover:opacity-100 opacity-90"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {isUpdatingProfile ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Uploading...
                </span>
              ) : (
                "Click the camera icon to update your photo"
              )}
            </p>
          </div>

          {/* Profile Info Section */}
          <div className="divide-y divide-gray-100">
            <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <User className="mr-2 h-5 w-5 text-gray-400" />
                Full Name
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {authUser?.fullName || "Not provided"}
              </div>
            </div>

            <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                Email Address
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;