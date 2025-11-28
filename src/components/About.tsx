import Link from "next/link";

export default function About() {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between py-12 md:py-24">
      {/* Text column */}
      <div className="w-full md:w-1/2 px-6 md:pl-12 md:pr-16">
        <h1 className="text-2xl md:text-4xl text-center md:text-left font-miller-banner font-black italic text-beige mb-6">
          Nice to meet you.
        </h1>

        <div className="font-articulat-cf font-bold text-base md:text-2xl text-beige mt-8 md:mt-14 md:mr-6">
          You can call me Ev. <br /><br />
          I'm a <span className="text-goldenrod">copywriter and creative director turned coder</span>. For over
          a decade, I've helped some of the world's biggest brands tell their
          stories with style and purpose.
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
          Some years ago, I started thinking deeply about what makes stories catch on
          and take off. I noticed the most impactful ones were usually paired
          with <span className="text-goldenrod">systems that make it
            irresistibly easy to engage.</span>
          <br />
          <br />
          I already loved telling stories that affect people deeply. Then I got
          hooked on building systems that delight them, and became a{" "}
          <span className="text-goldenrod">full-stack developer</span>.
          <br />
          <br />
          I've always felt close to hustlers and makers — the ones who dream,
          then do it.<br></br> I believe that's the space of abundant opportunity and
          creativity. If you're building, growing or launching something great,{" "}
          <span className="text-goldenrod underline">let's talk.</span>
        </div>
      </div>

      {/* Image column */}
      <div className="w-full md:w-1/2 px-6 md:pl-16 md:pr-16 mt-10 md:mt-24">
        <img src="/about.jpg" alt="Evan Burton" className="w-full h-auto" />
      </div>
    </div>
  );
}
