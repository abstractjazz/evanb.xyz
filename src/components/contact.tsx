import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
export default function Contact() {
  return (
    
    <div id="contact"className="bg-black" >
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8" id="contact-1">
        <div className="relative bg-black shadow-xl">
          {/* <h1 className="sr-only">Contact us</h1> */}

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative overflow-hidden bg-black py-10 px-6 sm:px-10 xl:p-12 text-beige">
             
              <h3 className="text-3xl font-articulat-cf text-beige">Get in touch.</h3>
             
              <Link href="https://calendly.com/ev-b/intro-consultation" rel="noopener noreferrer" target="_blank"><p className="text-xl mb-4 mt-4 text-goldenrod underline font-bold">Grab a time to chat on my calendar here. </p></Link>
              <ul key ="contactInfo-2">
                <p className="mb-4 mt-4">Based in Baltimore MD</p>
              <li className="flex space-x-3" key="phone-2">
              <EnvelopeIcon className="h-5 w-5" ></EnvelopeIcon>
              <span>hello@evanb.xyz</span>
              </li>

  
              <li className="flex space-x-3" key="envelope-2">
              <PhoneIcon className="h-5 w-5"/>
               <span>+1 415-304-2530</span>

               </li>
               </ul>
             
              
            </div>

            {/* Contact form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900"></h3>
              <form name="contact" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" action={"/success"} method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-100">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-100">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-100">
                      Phone
                    </label>
                    <span id="phone-optional" className="text-sm text-gray-500">
                      Optional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                      aria-describedby="phone-optional"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-100">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-100">
                      Message
                    </label>
                    <span id="message-max" className="text-sm text-gray-500">
                      Max. 500 characters
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-900"
                      aria-describedby="message-max"
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:flex sm:justify-end">
                  <button
                    type="submit"
                    className="mt-2 inline-flex w-full items-center justify-center border-2 border-black bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ffc800] hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}