import Image from 'next/image';

const serviceCategories = [
  {
    title: 'Construction Services',
    description:
      'Our construction services encompass a wide range of building solutions, ensuring structural integrity and aesthetic appeal.',
    services: [
      { name: 'Building Construction', image: '/services/construction1.jpg' },
      { name: 'Civil Works', image: '/services/construction2.jpg' },
      { name: 'Renovation & Remodeling', image: '/services/construction3.jpg' },
      { name: 'Concrete Structure Works', image: '/services/construction4.jpg' },
      { name: 'Masonry & Brickwork', image: '/services/construction5.jpg' },
      { name: 'Steel Structure Works', image: '/services/construction6.jpg' },
      { name: 'Road & Highway Construction', image: '/services/construction7.jpg' },
      { name: 'Bridge Construction', image: '/services/construction8.jpg' },
      { name: 'Foundation Works', image: '/services/construction9.jpg' },
      { name: 'Roofing Services', image: '/services/construction10.jpg' },
      { name: 'Waterproofing', image: '/services/construction11.jpg' },
      { name: 'Demolition Services', image: '/services/construction12.jpg' },
    ],
  },
  {
    title: 'Electrical & Mechanical Services',
    description:
      'Providing top-notch electrical and mechanical solutions to ensure safety, efficiency, and reliability in all projects.',
    services: [
      { name: 'Electrical Wiring & Cabling', image: '/services/electrical1.jpg' },
      { name: 'HVAC Installation', image: '/services/electrical2.jpg' },
      { name: 'Panel Board Installation', image: '/services/electrical3.jpg' },
      { name: 'Generator Setup', image: '/services/electrical4.jpg' },
      { name: 'Lighting Installation', image: '/services/electrical5.jpg' },
      { name: 'Fire Alarm Systems', image: '/services/electrical6.jpg' },
      { name: 'Security Systems', image: '/services/electrical7.jpg' },
      { name: 'Elevator Installation', image: '/services/electrical8.jpg' },
      { name: 'Plumbing Services', image: '/services/electrical9.jpg' },
      { name: 'Gas Piping', image: '/services/electrical10.jpg' },
      { name: 'Solar Panel Installation', image: '/services/electrical11.jpg' },
      { name: 'Mechanical Equipment Installation', image: '/services/electrical12.jpg' },
    ],
  },
  {
    title: 'Interior & Fit-Out Services',
    description:
      'Transforming spaces with innovative interior designs and high-quality fit-out services tailored to client needs.',
    services: [
      { name: 'False Ceiling Installation', image: '/services/interior1.jpg' },
      { name: 'Partition Works', image: '/services/interior2.jpg' },
      { name: 'Painting & Finishing', image: '/services/interior3.jpg' },
      { name: 'Carpentry Works', image: '/services/interior4.jpg' },
      { name: 'Flooring Installation', image: '/services/interior5.jpg' },
      { name: 'Wall Cladding', image: '/services/interior6.jpg' },
      { name: 'Modular Kitchen Setup', image: '/services/interior7.jpg' },
      { name: 'Bathroom Renovation', image: '/services/interior8.jpg' },
      { name: 'Furniture Installation', image: '/services/interior9.jpg' },
      { name: 'Lighting Design', image: '/services/interior10.jpg' },
      { name: 'Acoustic Solutions', image: '/services/interior11.jpg' },
      { name: 'Custom Joinery', image: '/services/interior12.jpg' },
    ],
  },
  {
    title: 'General Maintenance Services',
    description:
      'Ensuring longevity and optimal performance of facilities through our comprehensive maintenance solutions.',
    services: [
      { name: 'Plumbing Maintenance', image: '/services/maintenance1.jpg' },
      { name: 'AC Maintenance', image: '/services/maintenance2.jpg' },
      { name: 'Pest Control Services', image: '/services/maintenance3.jpg' },
      { name: 'Cleaning Services', image: '/services/maintenance4.jpg' },
      { name: 'Electrical Maintenance', image: '/services/maintenance5.jpg' },
      { name: 'Painting Maintenance', image: '/services/maintenance6.jpg' },
      { name: 'Carpentry Maintenance', image: '/services/maintenance7.jpg' },
      { name: 'Masonry Repairs', image: '/services/maintenance8.jpg' },
      { name: 'Roof Repairs', image: '/services/maintenance9.jpg' },
      { name: 'Waterproofing Maintenance', image: '/services/maintenance10.jpg' },
      { name: 'Facade Cleaning', image: '/services/maintenance11.jpg' },
      { name: 'Garden & Landscaping', image: '/services/maintenance12.jpg' },
    ],
  },
];

export default function Services() {
  return (
    <div className="py-12 px-6 md:px-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

      {serviceCategories.map((category, i) => (
        <div key={i} className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
          <p className="text-gray-600 mb-6">{category.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.services.map((service, j) => (
              <div key={j} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={250}
                  className="rounded-md object-cover mb-3"
                />
                <h3 className="text-lg font-medium">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
