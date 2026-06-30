import Reveal from './Reveal';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-height-screen h-screen flex flex-col justify-center items-center p-0 overflow-hidden bg-radial from-[#2b211a] to-[#1a1410]"
    >
      <div className="flex flex-col items-center text-center max-w-[900px] p-8 z-10">
        <Reveal>
          <span className="text-[0.75rem] font-semibold text-[#8a3b2e] uppercase tracking-[0.3em] mb-10 inline-block">
            a little story about you
          </span>
        </Reveal>
        <Reveal delay="delay-1">
          <h1 className="font-serif font-light italic text-[clamp(2rem,5vw,4rem)] leading-[1.3] text-[#faf6f0] max-w-[800px] mx-auto px-8">
            "My spidey senses have been tingling around you."
          </h1>
        </Reveal>
      </div>

      <a
        href="#spiderman"
        className="absolute bottom-12 flex flex-col items-center gap-3 text-[#faf6f0]/60 hover:text-[#8a3b2e] no-underline text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-300 select-none cursor-pointer"
      >
        <span>scroll</span>
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-[#faf6f0]/40 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[15px] bg-[#8a3b2e] [animation:scroll-dot_2s_infinite_ease-in-out]"></div>
        </div>
      </a>
    </section>
  );
}
