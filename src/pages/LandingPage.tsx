import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

export function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <WebGLShader />

      {/* dark overlay for legibility */}
      <div
        className="fixed inset-0 bg-black/40 pointer-events-none"
        aria-hidden
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span
          className="mb-6 text-6xl md:text-7xl animate-fade-in-up"
          aria-hidden
          style={{ animationDelay: "0ms" }}
        >
          🧞
        </span>

        <h1
          className="mb-4 text-5xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-[clamp(3rem,10vw,8rem)] animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          Text Genie
        </h1>

        <p
          className="mb-12 max-w-xl text-base text-white/70 md:text-lg animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Your wish, granted. AI-powered customer support that actually
          resolves things.
        </p>

        <a
          href="https://t.me/GeniedBot?start=landing"
          target="_blank"
          rel="noreferrer"
          className="animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <LiquidButton
            size="xl"
            className="text-white border rounded-full px-10 text-lg"
          >
            Text Genie 🧞
          </LiquidButton>
        </a>

      </main>

      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs text-white/40">
        Powered by{" "}
        <a
          href="https://usegoblin.xyz"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:text-white/70 hover:underline"
        >
          GoblinLabs
        </a>
      </footer>
    </div>
  )
}
