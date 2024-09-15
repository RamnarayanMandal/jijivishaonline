// src/components/PrivacyPolicy.js
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <h1 className="text-3xl lg:text-5xl font-bold text-red-600 text-center mb-6">
          Privacy Policy
        </h1>

        {/* Introduction Section */}
        <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            This Policy details our commitment to protecting the privacy of individuals who:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Visit our Websites ("Website Visitors")</li>
            <li>Register to use the products and services available at www.jijivishionline.com</li>
          </ul>
          <p className="text-gray-700">
            This Policy describes how Jijivisha collects, uses, shares, and secures the personal
            information that you provide. It also describes your choices regarding use, access,
            and correction of your personal information.
          </p>
        </section>

        {/* Service Data Section */}
        <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
            Policy does not apply – Service Data:
          </h2>
          <p className="text-gray-700 mb-4">
            With the exception of Account Information and other information we collect in
            connection with your registration or authentication into our Website, this Policy
            does not apply to our security and privacy practices in connection with electronic
            data, text, messages, communications or other materials submitted to and stored within
            the Services by you ("Service Data").
          </p>
          <p className="text-gray-700">
            Customers are solely responsible for establishing policies for, and ensuring compliance
            with, all applicable laws and regulations relating to the collection of personal information.
          </p>
        </section>

        {/* Use of Personal Information */}
        <section className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Our Use of Your Personal Information</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Deliver the products and services you have requested</li>
            <li>Manage customer relationships and provide support</li>
            <li>Perform research and analysis</li>
            <li>Communicate with you via email, postal mail, or mobile devices</li>
            <li>Develop and display content and advertising tailored to your interests</li>
            <li>Enforce our terms and conditions</li>
            <li>Manage user behaviors</li>
          </ul>
          <p className="text-gray-700 mt-4">
            These are not linked to any information that is personally identifiable. The purpose of
            the information is for analyzing trends, administering the site, and tracking users'
            movement on the website.
          </p>
        </section>

  {/* Information Collected From Other Sources Section */}
  <section className="bg-white shadow-lg p-6 rounded-lg mb-8 mt-8">
    <h1 className="text-xl lg:text-2xl font-semibold mb-4"> Information Collected From Other Sources</h1>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          social Media Widgets:
          </h2>
          <p className="text-gray-700 mb-4">
          The Websites include social media features, button, and widgets, such as the “Share this” button or interactive mini-programs that run 
on our Websites. These features may collect your Internet protocol address, which page you are visiting on the Websites, and may set a 
cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly 
on the Websites. Your interactions with these features are governed by the privacy statement of the companies that provide them
          </p>

          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          Information from Services Provided by Third Parties:
          </h2>
          <p className="text-gray-700">
          We may also obtain other information, including personal information, from third parties and combine that with information we collect 
through our Websites. For example, we may have access to certain information from a third party social media or authentication service 
if you log into our Services through such a service or otherwise provide us with access to information from the service. Any access that 
we may have to such information from a third party social media or authentication service is in accordance with the authorization 
procedures determined by that service. If you authorize us to connect with a third party service, we will access and store your name, 
email address(es), current city, profile picture URL, and any other personal information that the third party service makes available to us, 
and use and disclose it in accordance with this Policy. You should check your privacy settings on these third party services to understand 
and change the information sent to us through these services. For example, you may choose to log in to the Services using single sign-in 
services such as Facebook Connect or an Open ID provider
          </p>
          <p className='text-gray-700'>
          These single sign-on services will authenticate your identity, provide you with the option to share certain personal information (such as 
your name and email address) with us, and pre-populate our sign-up form. Services like Facebook Connect give you the option to post 
information about your activities in the Services to your profile page to share with others within your network
          </p>
        </section>


          {/* Cookies and Web Beacons Section */}
  <section className="bg-white shadow-lg p-6 rounded-lg mb-8 mt-8">
    
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          Cookies and Web Beacons :
          </h2>
          <p className="text-gray-700 mb-4">
          Like any other website, jijivisha uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages 
on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web 
page content based on visitors’ browser type and/or other information.
          </p>

          <p className="text-gray-700 mb-4">
          For more general information on cookies, please read “What Are Cookies” from Cookie Consent
          </p>

          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          Google DoubleClick DART Cookie
          </h2>
          <p className="text-gray-700">
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based 
upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by 
visiting the Google ad and content network Privacy Policy at the following URL - <span className='text-red-700'>https://policies.google.com/technologies/ads</span>
          </p>
         
        </section>


      </div>
    </div>
  );
};

export default PrivacyPolicy;
