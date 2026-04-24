import { useState, useEffect, useRef } from "react";
import { Pencil, Camera, Mail, Home, User as UserIcon, Save, X } from "lucide-react";
import Section from "../components/ui/Section";
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
  const [profilePic, setProfilePic] = useState("http://placehold.co/600x400");
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
      
        const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/me/profile-picture`, {
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
      const res = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/me`, {
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
            `http://${import.meta.env.VITE_BACKEND_URL}/api/me/profile-picture/${userId}`,
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
          setProfilePic("http://via.placeholder.com/120");
        }
      };
      if (userObj.id) fetchAndSetProfilePic(userObj.id);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xs uppercase tracking-[0.3em] text-mistral-black/20 animate-pulse">LOADING PROFILE...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Section
        eyebrow="ACCOUNT SETTINGS"
        title={<>USER<br /><span className="text-brand-orange">PROFILE</span></>}
        subtitle="Manage your personal information and account security details."
      >
        <div className="max-w-4xl mx-auto">
          <Card variant="white" className="p-0 overflow-hidden border border-mistral-black/5 shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Left Column: Avatar & Quick Info */}
              <div className="p-8 md:p-12 bg-warm-ivory border-b md:border-b-0 md:border-r border-mistral-black/5 flex flex-col items-center text-center">
                <div className="relative group mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-brand-orange/20 p-1">
                    <img
                      src={previewPic || profilePic}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <button
                    onClick={toggleEditingPic}
                    className="absolute bottom-1 right-1 bg-mistral-black text-white p-2 rounded-full shadow-lg hover:bg-brand-orange transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                </div>

                <div className="space-y-1 mb-8">
                  <h3 className="text-xl font-normal tracking-tight uppercase">{form.name}</h3>
                  <p className="text-[10px] tracking-widest text-mistral-black/40 uppercase">RESIDENT • {form.houseNo}</p>
                </div>

                {editingPic && (
                  <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {!previewPic ? (
                      <Button variant="outline" className="w-full text-[10px]" onClick={() => fileInputRef.current.click()}>
                        SELECT PHOTO
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="brand" className="flex-1 text-[10px]" onClick={handleSavePic}>SAVE</Button>
                        <Button variant="outline" className="flex-1 text-[10px]" onClick={() => setPreviewPic(null)}>RESET</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Form Details */}
              <div className="md:col-span-2 p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <Badge variant="outline">PERSONAL DETAILS</Badge>
                  {!editingDetails ? (
                    <Button variant="ghost" className="text-[10px] gap-2" onClick={handleEditDetails}>
                      <Pencil size={12} />
                      EDIT DETAILS
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-[10px] text-brand-orange" onClick={handleDiscardChanges}>
                        <X size={12} className="mr-1" />
                        DISCARD
                      </Button>
                      <Button variant="brand" className="text-[10px]" onClick={handleSaveDetails}>
                        <Save size={12} className="mr-1" />
                        SAVE
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase flex items-center gap-2">
                      <UserIcon size={12} /> FULL NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!editingDetails}
                      className="w-full bg-transparent border-b border-mistral-black/10 py-2 focus:outline-none focus:border-brand-orange disabled:opacity-50 transition-colors font-normal text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase flex items-center gap-2">
                        <Mail size={12} /> EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!editingDetails}
                        className="w-full bg-transparent border-b border-mistral-black/10 py-2 focus:outline-none focus:border-brand-orange disabled:opacity-50 transition-colors font-normal text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase flex items-center gap-2">
                        <Home size={12} /> HOUSE NUMBER
                      </label>
                      <input
                        type="text"
                        name="houseNo"
                        value={form.houseNo}
                        onChange={handleChange}
                        disabled={!editingDetails}
                        className="w-full bg-transparent border-b border-mistral-black/10 py-2 focus:outline-none focus:border-brand-orange disabled:opacity-50 transition-colors font-normal text-sm"
                      />
                    </div>
                  </div>

                  {editingDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">NEW PASSWORD</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="********"
                          value={form.password}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-mistral-black/10 py-2 focus:outline-none focus:border-brand-orange transition-colors font-normal text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">CONFIRM PASSWORD</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-mistral-black/10 py-2 focus:outline-none focus:border-brand-orange transition-colors font-normal text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8 flex justify-center">
            <p className="text-[10px] tracking-[0.3em] text-mistral-black/20 uppercase">MEMBER SINCE 2024</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
