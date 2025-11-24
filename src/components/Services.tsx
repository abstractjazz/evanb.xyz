import { FaceSmileIcon } from "@heroicons/react/24/outline";
import Image from "next/image";


const posts = [


  {
    title: "Brand Launch • Brand Refresh",
    category: { name: 'Brand' },
    description:
       "Let\'s show the world who you are.",
    imageUrl:'/airplane.gif',
    serviceList: ['Visual Identity', 'Verbal Identity', 'Brand Strategy',],
  },
  {
    title: "Custom Web Apps • Tailored AI Tools",
    category: { name: 'Web'},
    description:
     "Let's help you work smarter.",
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
       '/skull.gif',
   
    serviceList: [ 'Custom AI Agents & AI-Enabled Web Apps ', 'High-Converting Landing Pages', 'Custom Web Apps & Websites'],
  },
  {
    title: "Web Copy • Ad Copy",
    category: { name: 'Copy & Content',},
    description:
      "Let's tell stories that make people pay attention.",
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
     "/doublephone.gif",
    readingTime: '11 min',
    
    serviceList: ['Site Content', 'Creative Strategy', 'Ads & Social Media Campaigns' ],
  },
]

export default function Services() {
  return (
    <div id="services" className="relative bg-black px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        {/* BACKGROUND BELOW FOLD */}
        <div className="h-1/3 bg-black sm:h-2/3" />
      </div>
      <div  className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-beige sm:text-4xl font-miller-banner">Services</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-beige/80 sm:mt-4">
          <br></br> Three-trick pony. 
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, id) => (
        
            <div key={id} className="flex flex-col overflow-hidden border-2 border-black shadow-lg">
              <div className="flex-shrink-0">
                <Image
                  className="h-72 w-full object-cover object-center"
                  src={post.imageUrl}
                  alt={post.title}
                  width={640}
                  height={288}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                />
              
          
              </div>
              <div className="flex flex-1 flex-col justify-between bg-black p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#ff66ea] mb-3">
                    
                      {post.category.name}
                 
                  </p>
                  
                    <p className="text-xl font-semibold text-beige">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p><br></br>
            
                  <div className="ml-4">
                    {post.serviceList.map((service, index)=>
                    <ul  className="list-disc" key={`ul${index}`}>
                      <li className="flex space-x-3">
                        <FaceSmileIcon className="h-6 w-6 flex-shrink-0 text-[#ff66ea]" aria-hidden="true"></FaceSmileIcon>
                        <span className="text-sm text-beige mb-1">{service}</span>
                      </li>
                    </ul>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
