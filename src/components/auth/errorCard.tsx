import { MoveLeft } from "lucide-react";
import { Container } from "../shared";
import { Button } from "../ui";

export const ErrorCard = () => {
  return (
    <section key="login-form" className="flex items-center justify-center">
      <Container>
        <div className="pt-[200px]">
          <div className="p-4 flex items-center flex-col border-[1px] border-solid border-input bg-card rounded-lg">
            <p className="font-light text-2xl my-3">
              Oops! Something went wrong!
            </p>
            <Button
              className={"mt-4 text-lg gap-x-2"}
              variant="outline"
              size="lg"
            >
              <MoveLeft />
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
