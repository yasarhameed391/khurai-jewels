'use client';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#8F4B43]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.4em] uppercase">Policy</span>
          <h1 className="text-4xl sm:text-5xl text-[#F5EDE6] font-light mt-4">Return & Refund Policy</h1>
          <p className="text-[#F5EDE6]/60 text-lg mt-6 font-light">
            We want you to be completely satisfied with your purchase.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="bg-[#8F4B43]/30 rounded-xl p-6 border border-[#F5EDE6]/20">
            <h3 className="text-[#F5EDE6] text-lg font-medium mb-4 flex items-center gap-3">
              <span className="text-[#F5EDE6]">↩️</span>
              Returns
            </h3>
            <div className="text-[#F5EDE6]/60 space-y-3 font-light">
              <p>• We accept returns within 7 days of delivery for eligible items.</p>
              <p>• Items must be unworn, in original packaging, and with all tags attached.</p>
              <p>• Custom or personalized items are not eligible for return unless there is a manufacturing defect.</p>
              <p>• To initiate a return, please contact us at khurai.jewels@gmail.com with your order details.</p>
            </div>
          </div>

          <div className="bg-[#8F4B43]/30 rounded-xl p-6 border border-[#F5EDE6]/20">
            <h3 className="text-[#F5EDE6] text-lg font-medium mb-4 flex items-center gap-3">
              <span className="text-[#F5EDE6]">💰</span>
              Refunds
            </h3>
            <div className="text-[#F5EDE6]/60 space-y-3 font-light">
              <p>• Once we receive and inspect your return, we will process your refund within 5-7 business days.</p>
              <p>• Refunds will be credited to the original payment method.</p>
              <p>• Shipping charges are non-refundable unless the return is due to our error.</p>
              <p>• If the item is damaged or defective, we will cover the return shipping costs.</p>
            </div>
          </div>

          <div className="bg-[#8F4B43]/30 rounded-xl p-6 border border-[#F5EDE6]/20">
            <h3 className="text-[#F5EDE6] text-lg font-medium mb-4 flex items-center gap-3">
              <span className="text-[#F5EDE6]">❌</span>
              Non-Returnable Items
            </h3>
            <div className="text-[#F5EDE6]/60 space-y-3 font-light">
              <p>• Earrings (for hygiene reasons)</p>
              <p>• Items damaged due to customer misuse</p>
              <p>• Items without original packaging or tags</p>
              <p>• Gift cards and digital downloads</p>
            </div>
          </div>

          <div className="bg-[#8F4B43]/30 rounded-xl p-6 border border-[#F5EDE6]/20">
            <h3 className="text-[#F5EDE6] text-lg font-medium mb-4 flex items-center gap-3">
              <span className="text-[#F5EDE6]">📦</span>
              Exchanges
            </h3>
            <div className="text-[#F5EDE6]/60 space-y-3 font-light">
              <p>• We offer exchanges for size or color adjustments.</p>
              <p>• Contact us within 7 days of delivery to request an exchange.</p>
              <p>• Exchange shipping will be at the customer's expense unless the issue is due to our error.</p>
            </div>
          </div>

          <div className="bg-[#8F4B43]/30 rounded-xl p-6 border border-[#F5EDE6]/20">
            <h3 className="text-[#F5EDE6] text-lg font-medium mb-4 flex items-center gap-3">
              <span className="text-[#F5EDE6]">📞</span>
              Contact Us
            </h3>
            <div className="text-[#F5EDE6]/60 space-y-3 font-light">
              <p>• If you have any questions about our return policy, please reach out.</p>
              <p>• Email: khurai.jewels@gmail.com</p>
              <p>• We are here to help and ensure your satisfaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
