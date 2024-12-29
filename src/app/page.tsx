import { Container } from "@/components/shared";
import { SignInButton } from "@/components/ui";

export default function Home() {
  return (
    <>
      <header></header>
      <main className="min-h-screen">
        <section className="flex items-center justify-center">
          <Container>
            <div className="text-center mt-[270px]">
              <h1 className="font-bold text-6xl tracking-wide">SKILL UPPING</h1>
              <p className="font-light text-2xl my-3">
                Прокачивай свои навыки и становись лучше
              </p>
              <SignInButton />
            </div>
          </Container>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
