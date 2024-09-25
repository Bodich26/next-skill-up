import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import { User } from "lucide-react";

export default function Welcome() {
  return (
    <section className="flex items-center justify-center">
      <Container>
        <div className="text-center pt-80 pb-80">
          <h1 className="font-bold text-6xl tracking-wide">SKILL UPPING</h1>
          <p className="font-light text-2xl my-3">
            Прокачай свой скилл и становись лучше
          </p>
          <Button
            className={"mt-11 text-lg gap-x-2"}
            variant="outline"
            size="lg"
          >
            <User size={24} />
            Войти
          </Button>
        </div>
      </Container>
    </section>
  );
}
