import Link from "next/link";

export default function Thanks() {  
  return (
    <div className="bg-black">
     <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl font-miller-banner font-black italic text-beige mb-6">
          Thanks for reaching out. We'll be in touch soon.
        </h1> 
       <Link href="/#home"><p className="text-xs text-gray-500 underline cursor-pointer">[Home]</p></Link>
    </div>
    </div>
  );
}
