// src/components/ShippingPolicy.js
import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <h1 className="text-3xl lg:text-5xl font-bold text-red-600 text-center mb-6">
          Shipping Policy
        </h1>

        <p className="text-gray-700 text-center mb-8">
          This document sets out the shipping policy that applies to customers that make a purchase at Jijivishionline.com. 
          If you have any questions or doubts, please contact our customer service team on shop@jijivishionline.com or WhatsApp us on +91-7995321114.
        </p>

        {/* Domestic Shipping Section */}
        <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">1. DOMESTIC SHIPPING</h2>
          
          <h3 className="text-xl font-semibold mb-2">Shipping Options & Delivery Costs</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>DTDC</li>
            <li>Delhivery</li>
            <li>India Post</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Free Domestic shipping on orders above INR 1999. For orders less than INR 1999, a delivery cost might be applicable 
            depending upon the Place of delivery and the Cost of product. Cash on delivery is available for purchases above INR 1999.
          </p>

          <h3 className="text-xl font-semibold mb-2">Order Processing Time</h3>
          <p className="text-gray-700 mb-4">
            All orders placed before 2pm Monday to Friday are processed and dispatched the same day, all orders placed after 2pm 
            will be dispatched the next day. Standard delivery takes place within 5-8 working days.
          </p>

          <p className="text-gray-700 mb-4">
            If in case, your pin code is non-serviceable by our Courier partner, it might take a little longer than committed.
          </p>

          <h3 className="text-xl font-semibold mb-2">Cancellation Policy</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>We accept cancellations against full refund or store credit within 12 hours of placing your order.</li>
            <li>We are unable to accept any cancellation requests after 12 hours of placing the order.</li>
          </ul>
        </section>

        {/* International Shipping Section */}
        <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">2. INTERNATIONAL SHIPPING</h2>
          
          <h3 className="text-xl font-semibold mb-2">Shipping Options & Delivery Costs</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>FedEx</li>
            <li>DHL</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Order Processing Time</h3>
          <p className="text-gray-700 mb-4">
            All the orders placed will be processed and dispatched the next working day. Orders placed during the weekend 
            or on a public holiday will be sent from our warehouse on the next business day.
          </p>

          <h3 className="text-xl font-semibold mb-2">International Orders</h3>
          <p className="text-gray-700 mb-4">
            We ship worldwide to all destinations. Your package may be subject to import duties and taxes. 
            You, as the customer, are responsible for paying those fees in addition to the Product purchase amount and shipping fee.
          </p>

          <p className="text-gray-700 mb-4">
            - We charge a flat shipping fee of USD 30 on all orders below USD 249.<br />
            - Orders above USD 249 enjoy free shipping worldwide.<br />
            - Any duties/taxes levied by your country are to be borne by you. Our shipping partner will collect these (if any) at the time of delivery.
          </p>


          <h3 className="text-xl font-semibold mb-2">Cancellation Policy</h3>
         

          <p className="text-gray-700 mb-4">
            -  We accept cancellations against store credit voucher within 12 hours of placing your order.<br />
            -  We are unable to accept any cancellation requests after 12 hours of placing the order.<br />
                     </p>


                     
          <h3 className="text-xl font-semibold mb-2"> Delivery Address</h3>
         

         <p className="text-gray-700 mb-4">
         - Please note that we will be unable to modify the delivery address once you have placed your order<br />
           <br />
                    </p>

                    <h3 className="text-xl font-semibold mb-2"> Tracking Your Orde</h3>
         

         <p className="text-gray-700 mb-4">
         - Once your order has been dispatched, we will send you a confirmation email with tracking information. You will be able to track your 
         package directly on the carrier’s website <br />
           <br />
                    </p>


                    <h3 className="text-xl font-semibold mb-2">  Returns, Refunds, and Exchanges</h3>
         

         <p className="text-gray-700 mb-4">
         Please read our for detailed information about our processes<br />
           <br />
                    </p>

      
         


        </section>
        <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h1>

      {/* Domestic Shipping */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          1. Domestic Shipping
        </h2>
        <p className="text-gray-600">
          For details on our return & refund policy, please check our website.
        </p>
      </div>

      {/* International Shipping */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          2. International Shipping
        </h2>
        <p className="text-gray-600">
          For international shipping inquiries, visit us at{" "}
          <a
            href="https://www.jijivishaonline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            www.jijivishaonline.com
          </a>
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-8">
        <p className="text-gray-600">
          Email us at:{" "}
          <a
            href="mailto:shop@jijivishaonline.co"
            className="text-red-500 hover:underline"
          >
            shop@jijivishaonline.co
          </a>
        </p>
        <p className="text-gray-600">
          Call us:{" "}
          <a href="tel:+917995321114" className="text-red-500 hover:underline">
            +91-7995321114
          </a>
        </p>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
