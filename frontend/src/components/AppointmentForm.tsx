
import React, { useState, useEffect, useRef } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";


// Tracking functions
const trackFormSubmission = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
    window.fbq('track', 'CompleteRegistration');
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      'event_category': 'engagement',
      'event_label': 'appointment_form'
    });
  }
};

const trackFormStarted = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'StartTrial');
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      'event_category': 'engagement',
      'event_label': 'appointment_form_start'
    });
  }
};

const trackFormError = (errorMessage: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'FormError', {
      error: errorMessage
    });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      'description': errorMessage,
      'fatal': false,
      'event_label': 'appointment_form_error'
    });
  }
};

const AppointmentForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    problem: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq('trackCustom', 'FormViewed');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputFocus = (fieldName: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FormFieldFocus', {
        field: fieldName
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const submissionData = {
      name: formData.name,
      mobile: formData.mobile,
      explanation: formData.problem,
      address: formData.address,
    };

    try {
      trackFormStarted();
      
      const response = await fetch(
        "https://nana-clinic-landing-prateek2.vercel.app/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        trackFormError(errorMessage);
        throw new Error(errorMessage);
      }

      await response.json();
      trackFormSubmission();
      
      setFormStatus({
        type: "success",
        message: "Your appointment request has been submitted successfully!",
      });
      setFormData({ name: "", mobile: "", problem: "", address: "" });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "There was an error submitting your request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="appointment" className="py-1 bg-white" ref={sectionRef}>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div
              className="bg-clinic-secondary rounded-xl shadow-lg p-8 reveal"
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="w-full text-center inline-block px-4 py-1.5 bg-orange-300 text-white rounded-full text-2xl font-medium reveal mb-6">
                Get Price Estimate Now
              </h3>

              {/* Status messages */}
              {formStatus.type && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    formStatus.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"}`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name  *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('name')}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <label
                    htmlFor="problem"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Describe Your Problem *
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Please describe your ear condition or concerns"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-2xl flex items-center justify-center bg-green-600 text-white rounded-full px-6 py-3 font-medium transition-all duration-300 hover:bg-clinic-accent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-clinic-primary focus:ring-offset-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      Processing...
                    </>
                  ) : (
                    "Book a Hearing Aid Trial !!"
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our Privacy Policy and
                  Terms of Service.
                </p>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentForm;