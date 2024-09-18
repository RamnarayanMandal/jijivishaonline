import React from 'react';

const BridalShoppingAssistance = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <span className="text-red-600">Home</span> / Bridal Shopping Assistance
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-6">Bridal Shopping Assistance</h1>

        {/* Introduction */}
        <div className="mb-6">
          <p className="text-gray-800 mb-2">
            Dear Bride-to-be, Congratulations on your upcoming wedding! At JUJVISHA, we understand that wedding planning can be overwhelming, especially when it comes to selecting the perfect bridal attire for all the functions. That's why we are here to assist you in every step of the way.
          </p>
          <p className="text-gray-800 mb-2">
            We at JUJVISHA offer a wide range of bridal attire, including sarees, lehengas, jewellery, salwar kameez, and more, perfect for all the pre-wedding and wedding functions. We offer an array of packages that cater to all your wedding functions, including mehendi, sangeet, haldi, wedding day, and reception. We understand that every bride is unique, and that's why we offer a personalized shopping experience.
          </p>
          <p className="text-gray-800 mb-2">
            Our expert bridal consultants are available to guide you in selecting the perfect attire that matches your style, body, and reception. We understand every bride's uniqueness, and our personalized service helps you feel confident and beautiful on your special day. Listed below are our various packages:
          </p>
        </div>

        {/* Packages */}
        <div className="space-y-8">
          {/* Consultation Fee */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Consultation Fee:</h2>
            <p className="text-gray-700">
              During the consultation, we will work with you to understand your vision for your wedding, your personal style, and your budget. We will then provide customized recommendations for wedding attire, jewellery, and accessories that align with your preferences and requirements. (Price: ₹5,000)
            </p>
          </div>

          {/* Basic Bridal Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Basic Bridal Shopping Package</h2>
            <p className="text-gray-700">
              Our designers will design the best bridal wear and assist you in choosing accessories for the wedding that will go with your personality, body type, and the theme of the wedding. (Price: ₹15,000)
            </p>
          </div>

          {/* Advanced Bridal Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Advanced Bridal Shopping Package</h2>
            <p className="text-gray-700">
              Our team of experts and stylists will work with you to create a personalized look that suits your style and the wedding theme. We will provide you with customized outfits and accessories for the wedding as well as the ring ceremony and haldi functions. (Price: ₹35,000 - Milestone Payment)
            </p>
          </div>

          {/* Premium Bridal Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Premium Bridal Shopping Package</h2>
            <p className="text-gray-700">
              Our team of experts, stylists, and designers will work with you to create a personalized look that suits your style and the wedding theme. We will provide you with customized outfits and accessories for the pre-wedding shoots, ring ceremony, haldi-sangeet, wedding, and reception. Also, additional services such as on-site dressing assistance on your wedding day, and assisting family in choosing their garments according to the wedding theme. (Price: ₹50,000 - Milestone Payment)
            </p>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sustainability & Environment</h2>
          <p className="text-gray-700">
            At JIJIVISHA, we are committed to promoting sustainability and reducing waste in our operations. Most of our products are made from eco-friendly materials, and we ensure that our suppliers follow ethical and fair-trade practices.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-10">
          <p className="text-gray-700">
            We understand that your wedding day is one of the most important days of your life, and we are honored to be a part of your special journey. Let us help you find the perfect bridal attire that will make you feel confident, beautiful, and comfortable on your big day.
          </p>
          <p className="text-gray-700 mt-4">
            We are delighted to offer a special combo offer for bridal and groom shopping assistance for weddings. With our combo offer, you can avail of our Bridal Grooming package and Groom Shopping assistance at a discounted price. Our team will work with you to create a cohesive and complementary look for the bride and groom, ensuring that they look stunning on their special day.
          </p>
          <p className="text-gray-700 mt-4">
            If you have any questions or need assistance, please do not hesitate to contact us at <a href="tel:+917985532114" className="text-red-500">+91 79855 32114</a> or email us at <a href="mailto:shop@juvjishaline.com" className="text-red-500">shop@juvjishaline.com</a>. We are always here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BridalShoppingAssistance;
