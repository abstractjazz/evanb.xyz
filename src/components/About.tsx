import Link from "next/link";

export default function About() {
  return (
    <div id="about" className="bg-black w-full flex flex-col md:flex-row md:justify-between">
      {/* Text column */}
      <div className="w-full md:w-1/2 px-6 mt-0 md:ml-12 md:mr-16">
        <h1 className="text-2xl md:text-4xl text-center font-miller-banner font-black italic text-beige mb-6 mt-10 md:mt-45">
          Nice to meet you.
        </h1>

        <div className="font-articulat-cf font-bold text-base md:text-2xl text-beige mt-8 md:mt-14 md:ml-0 md:mr-6">
          You can call me Ev. <br></br><br></br> I'm a <span className="text-goldenrod">copywriter and creative director turned coder
          </span>. For over a decade, I've helped some of the world's biggest brands 
         tell their stories with style and purpose.
          <br />
          <br />
          Along the way, I collected some useful experience, including{" "}
          <span className="text-goldenrod">
            360 Advertising, Brand Identity, and Design Thinking
          </span>
          . If you want to know more about that part of my journey, you can
          check out{" "}
          <Link
            className="underline"
            href="https://heyevan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
        
            my portfolio.
          </Link>
          <br />
          <br />
          Some years ago, I started thinking deeply about how stories catch on
          and take off. I noticed the most impactful ones were usually paired
          with systems that make it<span className="text-goldenrod"> irresistibly easy to engage.</span>
          <br />
          <br />
          I already loved telling stories that affect people deeply. Then I got
          hooked on building sytems that delight them, and became a <span className="text-goldenrod">full-stack developer</span>.
          <span>
            <br />
            <br />
            I've always liked people who dream, then do it. I believe that's the
            space of abundant opportunity and creativity. If you're building,
            growing or launching something great,{" "}
            <span className="text-goldenrod underline">let's talk.</span>
          </span>
        </div>
      </div>

      {/* Image column */}
      <div className="w-full md:w-1/2 px-6 mt-10 md:mt-0 md:ml-16 md:mr-16 mb-16">
        <img src="/about.jpg" alt="Evan Burton" className="w-full h-auto" />
      </div>
    </div>
  );
}
