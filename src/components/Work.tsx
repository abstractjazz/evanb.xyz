import Link from "next/link";

export default function Work() {
  return (
    <div id="work"className="bg-black w-full flex flex-col md:flex-row-reverse md:justify-between">
      {/* Text column (right on desktop, top on mobile) */}
      <div className="w-full md:w-1/2 px-6 mt-10 md:mt-0 md:ml-12 md:mr-16 mb-12">
        <h1 className="text-2xl md:text-4xl text-center font-miller-banner font-black italic text-beige mb-6 md:mt-45">
          Coming right up.
        </h1>

        <div className="font-articulat-cf font-bold text-base md:text-2xl text-beige mt-4 md:mt-8 md:ml-0 md:mr-6">
          I&apos;m happy to share past projects and professional references directly. Reach out{" "}
          <Link href="/#contact" className="text-goldenrod underline">
            here
          </Link>
          .
        </div>
      </div>

      {/* Image column (left on desktop, bottom on mobile) */}
      <div className="w-full md:w-1/2 px-6 md:mt-0 md:ml-16 md:mr-16 mb-16">
        <img
          src="/mail.gif"
          alt="Under Construction"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
