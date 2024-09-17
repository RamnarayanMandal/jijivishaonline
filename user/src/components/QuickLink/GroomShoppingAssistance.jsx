import React from 'react';

const GroomShoppingAssistance = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <span className="text-red-600">Home</span> / Groom Shopping Assistance
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-6">Groom Shopping Assistance</h1>

        {/* Introduction */}
        <div className="mb-6">
          <p className="text-gray-800 mb-2">
            We are excited to announce that JUJVISHA now offers groom shopping assistance for Hindu weddings. We understand that weddings are a significant event in one's life, and we want to make sure that the groom looks his best on his special day.
          </p>
          <p className="text-gray-800 mb-2">
            Our team of experts will provide personalized assistance to the groom in selecting the perfect attire and accessories for all wedding functions, including mehendi, sangeet, wedding day, and reception. We offer a wide range of options, from traditional to contemporary styles, to cater to your individual preferences and requirements.
          </p>
          <p className="text-gray-800 mb-2">
            Our team will assist the groom in selecting the right fabric, color, and style that complements his personality and the theme of the wedding. We also provide advice on selecting accessories, including shoes, jewelry, turban, and watch, to complete the groom's look. Listed are our various packages:
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

          {/* Basic Groom Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Basic Groom Shopping Package</h2>
            <p className="text-gray-700">
              Our designers will design the best groom wear and assist you in choosing accessories for the wedding that will go with your personality, body type, and the theme of the wedding. (Price: ₹15,000)
            </p>
          </div>

          {/* Advanced Groom Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Advanced Groom Shopping Package</h2>
            <p className="text-gray-700">
              Our team of experts and stylists will work with you to create a personalized look that suits your style and the wedding theme. We will provide you with customized outfits and accessories for the wedding as well as the ring ceremony and haldi functions. (Price: ₹35,000 - Milestone Payment)
            </p>
          </div>

          {/* Premium Groom Shopping Package */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Premium Groom Shopping Package</h2>
            <p className="text-gray-700">
              Our team of experts, stylists, and designers will work with you to create a personalized look that suits your style and the wedding theme. We will provide you with customized outfits and accessories for the pre-wedding shoots, ring ceremony, haldi-sangeet, wedding, and reception. Also, additional services such as on-site dressing assistance on your wedding day, and assisting family in choosing their garments according to the wedding theme. (Price: ₹50,000 - Milestone Payment)
            </p>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sustainability & Environment</h2>
          <p className="text-gray-700">
            At JIJIVISHA, we believe in promoting sustainability and we take steps to minimize our impact on the environment. We offer eco-friendly and sustainable options wherever possible, without compromising on quality and style.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-10">
          <p className="text-gray-700">
            We are delighted to offer a special combo offer for both bridal and groom shopping assistance for weddings. With our combo offer, you can avail of our Bridal and Groom Shopping assistance at a discounted price. Our team will work with you to create a cohesive and complementary look for the bride and groom, ensuring that they look stunning on their special day.
          </p>
          <p className="text-gray-700 mt-4">
            If you have any questions or need assistance, please do not hesitate to contact us at <a href="tel:+917985532114" className="text-red-500">+91 79855 32114</a> or email us at <a href="mailto:shop@juvjishaline.com" className="text-red-500">
 shop@jijivishaonline.com</a>. We are always here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroomShoppingAssistance;
