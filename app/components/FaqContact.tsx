"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import PaymentForm from "./PaymentForm";

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FaqContact = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
 
    {
      question: "Is the workshop live or pre-recorded?",
      answer: "LIVE AND PRACTICAL. IT WILL NOT BE RECORDED",
      isOpen: false,
    },
    {
      question: "Is it a Certified Workshop",
      answer: "Yes. For sure",
      isOpen: false,
    },
    {
      question: "Will I get a Refund?",
      answer: "Unfortunately NO. We don’t have a refund policy as of now",
      isOpen: false,
    },
    {
      question:
        "I made the payment but did not receive any intimation. What should I do?",
      answer:
        "Don't worry. Please write to connect@xworks.live and we will resolve the issue at the earliest.",
      isOpen: false,
    },
    {
      question: "How to connect with us?",
      answer:
        "Please mail us at connect@xworks.live for any questions, queries, or information. We will get back to you at the earliest.",
      isOpen: false,
    },
    {
      question: "Who is conducting the workshop?",
      answer:
        "It will be conducted by XWORKS – a new age skilling organization specializing in Technology and Life Skills.",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqItems(
      faqItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }))
    );
  };

  const handlePayment = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (response: any, formData: any) => {
    // Handle successful payment logic here
    console.log("Payment Success:", response, formData);
    setShowPaymentForm(false); // Close the payment form after success
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Contact Section */}
        <section className="mb-12">
          <h1 className="sm:text-4xl mb-6 text-[#FF4D31] text-lg font-bold uppercase">Contact</h1>
          <div className="space-y-2">
            <p className="text-gray-700">
              Call &gt;{" "}
              <a
                href="tel:+917383808881"
                className="text-[#FF6B4E] hover:underline"
              >
                +91 73838-08881
              </a>
            </p>
            <p className="text-gray-700">
              Mail &gt;{" "}
              <a
                href="mailto:connect@xworks.live"
                className="text-[#FF6B4E] hover:underline"
              >
                connect@xworks.live
              </a>
            </p>
            <p className="text-gray-700">
              Register Today &gt;{" "}
              <a href="#" className="text-[#FF6B4E] hover:underline">
                Click here
              </a>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="sm:text-4xl  text-[#FF4D31] text-lg font-bold uppercase ">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span
                    className={`font-medium ${
                      faq.isOpen ? "text-[#FF6B4E]" : "text-gray-700"
                    }`}
                  >
                    {faq.question}
                  </span>
                  {faq.isOpen ? (
                    <Minus className="w-5 h-5 text-[#FF6B4E]" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {faq.isOpen && (
                  <div className="pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={handlePayment}
            className="w-full bg-[#6AD399] text-white py-4 rounded-md hover:bg-opacity-90 transition-opacity"
          >
            REGISTER FOR THIS WORKSHOP NOW
          </button>
          <button className="w-full bg-[#6AD399] text-white py-4 rounded-md hover:bg-opacity-90 transition-opacity">
            CLICK HERE FOR ANY ENQUIRY
          </button>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <PaymentForm
                onClose={() => setShowPaymentForm(false)}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FaqContact;
