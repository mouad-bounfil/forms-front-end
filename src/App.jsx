import { useState } from 'react';
import {
  Dialog,
  DialogContent
} from "./components/ui/DrawerDialog";

import { CircleCheckBig, Loader2, CircleX } from "lucide-react"
import { API_BASE_URL } from "./config";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    duration: '',
    keyResponsibilities: '',
    coverLetter: '',
  });
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Ensure we keep formData properties always defined (never undefined)
  // This handler updates only the relevant field, keeps others unchanged
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setOpen(true);
      setIsSubmitting(true);
      setIsSuccess(false);
      setErrorMessage('');
      console.log(formData);
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);
      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        setErrorMessage(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrorMessage('Could not reach the server. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full md:w-[50%] bg-white mx-auto rounded-lg border border-stone-200 shadow-sm overflow-hidden flex flex-col items-center justify-center">
          <ErrorBoundary>
            {isSubmitting ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <Loader2 className="w-20 h-20 text-green-500 animate-spin" />


              </div>
            ) : isSuccess ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <CircleCheckBig className="w-20 h-20 text-green-500" />
                <p className="text-md font-medium text-center text-stone-900">Your application has been submitted successfully. Thank you for your interest in our company. You will be contacted as soon as possible.</p>
                <button onClick={() => setOpen(false)} className="bg-stone-900 text-stone-50 hover:bg-stone-900/90 h-10 px-8 py-2">Close</button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4">
                <CircleX className="w-20 h-20 text-red-500" />
                <p className="text-md font-medium text-center text-stone-900">
                  {errorMessage || 'Error submitting application. Please try again.'}
                </p>
                <button onClick={() => setOpen(false)} className="bg-stone-900 text-stone-50 hover:bg-stone-900/90 h-10 px-8 py-2">Close</button>
              </div>
            )}
          </ErrorBoundary>
        </DialogContent>
      </Dialog>


      <div className="flex justify-center items-start bg-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-[50%] mx-auto bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">

          <div className="px-8 py-6 border-b border-stone-200 bg-stone-50/50">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Job Application</h2>
            <p className="text-sm text-stone-500 mt-1">Please fill out the form below to submit your application.</p>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>

            <div className="space-y-4">
              <h3 className="text-lg font-medium tracking-tight text-stone-900">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-stone-900">First name</label>
                  <input type="text" value={formData.firstName} name="firstName" onChange={handleChange} placeholder="Jane" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-stone-900">Last name</label>
                  <input type="text" value={formData.lastName} name="lastName" onChange={handleChange} placeholder="Doe" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-stone-900">Email address</label>
                  <input type="email" value={formData.email} name="email" onChange={handleChange} placeholder="jane@example.com" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-stone-900">Phone number</label>
                  <input type="tel" value={formData.phone} name="phone" onChange={handleChange} placeholder="+1 (555) 000-0000" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
              </div>
            </div>


            <div className="h-px w-full bg-stone-200"></div>

            <div className="space-y-4">
              <h3 class="text-lg font-medium tracking-tight text-stone-900">Recent Experience</h3>

              <div class="space-y-2">
                <label className="text-sm font-medium leading-none text-stone-900">Job Title</label>
                <input type="text" value={formData.jobTitle} name="jobTitle" onChange={handleChange} placeholder="e.g. Senior Mason / Sculptor" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none text-stone-900">Company</label>
                  <input type="text" value={formData.company} name="company" onChange={handleChange} placeholder="Company Name" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none text-stone-900">Duration</label>
                  <input type="text" value={formData.duration} name="duration" onChange={handleChange} placeholder="e.g. 2020 - Present" className="flex h-10 w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label class="text-sm font-medium leading-none text-stone-900">Key Responsibilities</label>
                <textarea rows="3" value={formData.keyResponsibilities} name="keyResponsibilities" onChange={handleChange} placeholder="Briefly describe your role and achievements..." className="flex w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors"></textarea>
              </div>
            </div>


            <div class="h-px w-full bg-stone-200"></div>

            <div class="space-y-4">
              <h3 class="text-lg font-medium tracking-tight text-stone-900">Lettre de Motivation</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-stone-900">Cover Letter</label>
                <p className="text-[13px] text-stone-500 mb-2">Explain why you are a great fit for this role.</p>
                <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="6" placeholder="Dear Hiring Manager..." className="flex w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors"></textarea>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-stone-900 text-stone-50 hover:bg-stone-900/90 h-10 px-8 py-2">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default App;
