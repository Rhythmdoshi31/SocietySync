import { useState, useEffect, useRef } from "react";
import { Pencil, Camera, Mail, Home, User as UserIcon, Save, X, Shield, Calendar } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function Me() {
  const [editingPic, setEditingPic] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  const [form, setForm] = useState({
    name: "John Doe",
    houseNo: "123",
    email: "john@example.com",
    password: "",
    confirmPassword: "",
  });
  const [initialForm, setInitialForm] = useState(form);
  const [profilePic, setProfilePic] = useState("https://placehold.co/600x400");
  const [previewPic, setPreviewPic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPic(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleSavePic = async () => {
    if (!selectedFile) return;
    try {
        const formData = new FormData();
        formData.append("profilePicture", selectedFile);
      
        const token = localStorage.getItem("token");
      
        const response = await fetch(`https://${import.meta.env.VITE_BACKEND_URL}/api/me/profile-picture`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      
        if (!response.ok) {
          throw new Error("Failed to upload profile picture");
        }
        const data = await response.json();
        setProfilePic(`${data.profilePictureUrl}?t=${Date.now()}`); 
        setSelectedFile(null);
        setEditingPic(false);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
  };

  const handleEditDetails = () => {
    setInitialForm(form);
    setEditingDetails(true);
    setForm({ ...form, password: "", confirmPassword: "" });
  };

  const toggleEditingPic = () => {
    setEditingPic(!editingPic);
    if (editingPic) setPreviewPic(null);
  };

  const validateForm = () => {
    if (editingDetails) {
      if (!form.name || !form.houseNo || !form.email) {
        alert("All fields are required");
        return false;
      }
      if (form.password !== "" && form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSaveDetails = async () => {
    if (!validateForm()) return;

    try {
      const updatedFields = {};

      if (form.password && form.password !== "********" && form.password !== initialForm.password) {
        updatedFields.password = form.password;
      }

      for (const key in form) {
        if (key !== "password" && key !== "confirmPassword" && form[key] !== initialForm[key]) {
          updatedFields[key] = form[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        setEditingDetails(false);
        return;
      }

      const token = localStorage.getItem("token");
      const res = await fetch(`https://${import.meta.env.VITE_BACKEND_URL}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setForm((prev) => ({
        ...prev,
        password: "********",
        confirmPassword: "",
      }));
      setInitialForm((prev) => ({
        ...prev,
        ...updatedFields,
        password: "********",
        confirmPassword: "",
      }));
      setEditingDetails(false);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...storedUser,
        ...updatedFields,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (error) {
      console.error("Failed to save details:", error.message);
      alert(error.message);
    }
  };

  const handleDiscardChanges = () => {
    setForm({ ...initialForm, confirmPassword: "" });
    setEditingDetails(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const adminData = localStorage.getItem('admin');
    const workerData = localStorage.getItem('worker');
  
    if (token && (storedUser || adminData || workerData)) {
      const userObj = storedUser ? JSON.parse(storedUser) : adminData ? JSON.parse(adminData) : JSON.parse(workerData);
      setUser(userObj);
      setForm({
        name: userObj.name || "John Doe",
        houseNo: userObj.houseNo || "123",
        email: userObj.email || "john@example.com",
        password: "********",
        confirmPassword: "",
      });
      setInitialForm({
        name: userObj.name || "John Doe",
        houseNo: userObj.houseNo || "123",
        email: userObj.email || "john@example.com",
        password: "********",
        confirmPassword: "",
      });
  
      const fetchAndSetProfilePic = async (userId) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://${import.meta.env.VITE_BACKEND_URL}/api/me/profile-picture/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch profile picture");
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setProfilePic(objectUrl);
        } catch (err) {
          console.error("Error fetching profile picture:", err);
          setProfilePic("https://via.placeholder.com/120");
        }
      };
      if (userObj.id) fetchAndSetProfilePic(userObj.id);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-mistral-black/20 animate-pulse font-bold">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Account Settings" 
        subtitle="Manage your personal profile and account security."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Profile Card */}
        <Card className="lg:col-span-4 flex flex-col items-center text-center py-10">
          <div className="relative group mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-brand-orange/20 p-1 bg-white shadow-inner">
              <img
                src={previewPic || profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover transition-all duration-500"
              />
            </div>
            <button
              onClick={toggleEditingPic}
              className="absolute bottom-1 right-1 bg-mistral-black text-white p-2.5 rounded-xl shadow-lg hover:bg-brand-orange transition-all duration-200 active:scale-95"
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="space-y-1.5 mb-8">
            <h3 className="text-xl font-bold tracking-tight text-foreground">{form.name}</h3>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="brand" className="h-5 text-[9px] px-2 font-bold uppercase tracking-wider">Resident</Badge>
              <span className="text-[10px] font-bold tracking-widest text-mistral-black/60 uppercase">Flat {form.houseNo}</span>
            </div>
          </div>

          {editingPic && (
            <div className="w-full space-y-3 px-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              {!previewPic ? (
                <Button variant="outline" className="w-full h-10 text-[10px] font-bold tracking-widest" onClick={() => fileInputRef.current.click()}>
                  SELECT NEW PHOTO
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="brand" className="flex-1 h-10 text-[10px] font-bold" onClick={handleSavePic}>SAVE</Button>
                  <Button variant="outline" className="flex-1 h-10 text-[10px] font-bold" onClick={() => setPreviewPic(null)}>RESET</Button>
                </div>
              )}
            </div>
          )}

          <div className="w-full pt-8 mt-4 border-t border-border space-y-4 px-6">
             <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-mistral-black/60">
                <span className="flex items-center gap-2"><Calendar size={12}/> Joined</span>
                <span className="text-foreground">APRIL 2024</span>
             </div>
             <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-mistral-black/60">
                <span className="flex items-center gap-2"><Shield size={12}/> Security</span>
                <span className="text-emerald-600 font-bold">VERIFIED</span>
             </div>
          </div>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-mistral-black/60">Personal Details</h3>
            {!editingDetails ? (
              <Button variant="outline" className="h-9 px-4 text-[10px] font-bold gap-2" onClick={handleEditDetails}>
                <Pencil size={12} />
                EDIT PROFILE
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" className="h-9 px-4 text-[10px] font-bold text-brand-orange opacity-100" onClick={handleDiscardChanges}>
                  DISCARD
                </Button>
                <Button variant="brand" className="h-9 px-4 text-[10px] font-bold" onClick={handleSaveDetails}>
                  SAVE CHANGES
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Full Name</label>
              <div className="relative">
                <UserIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-mistral-black/40" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editingDetails}
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange disabled:bg-gray-50 disabled:border-transparent transition-all font-bold text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-mistral-black/40" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editingDetails}
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange disabled:bg-gray-50 disabled:border-transparent transition-all font-bold text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Flat Number</label>
              <div className="relative">
                <Home size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-mistral-black/40" />
                <input
                  type="text"
                  name="houseNo"
                  value={form.houseNo}
                  onChange={handleChange}
                  disabled={!editingDetails}
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange disabled:bg-gray-50 disabled:border-transparent transition-all font-bold text-foreground"
                />
              </div>
            </div>

            {editingDetails && (
              <>
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">New Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-bold text-foreground"
                  />
                </div>
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-bold text-foreground"
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
