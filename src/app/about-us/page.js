import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="bg-white py-12 px-6 md:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            Building the future with integrity, innovation, and passion.
          </p>
        </div>

        {/* Company Overview & Image */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <p>
              Welcome to <strong>[Your Company Name]</strong>, your trusted partner in delivering
              high-quality solutions across construction, engineering, and technical services.
              We are committed to excellence, customer satisfaction, and long-term value.
            </p>
            <p>
              With a team of experienced professionals and a vision to lead through innovation,
              we provide reliable services that meet the evolving needs of our clients.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/about-us.jpg" // Place this image in public/about-us.jpg
              alt="About Us"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Construction & Renovation</li>
            <li>Electrical & Mechanical Installations</li>
            <li>Project Management & Consultancy</li>
            <li>Interior Design & Fit-Out</li>
            <li>General Maintenance & Technical Services</li>
          </ul>
        </div>

        {/* CEO Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <Image
              src="/ceo.jpg" // Place this image in public/ceo.jpg
              alt="CEO"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-md w-64 h-64 mx-auto md:mx-0"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-semibold">About Our CEO</h3>
            <p>
              <strong>[CEO’s Name]</strong> is the visionary behind our company, bringing over [X] years of
              industry experience in civil engineering and project leadership. With a deep understanding
              of both client needs and technical execution, [he/she/they] has led our growth with integrity,
              innovation, and excellence.
            </p>
            <p>
              Under [his/her/their] leadership, we have become a trusted name across the industry,
              delivering exceptional results and building strong client relationships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
