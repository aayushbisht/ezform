import { FormProvider } from "../../contexts/FormContext";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      {children}
    </FormProvider>
  );
} 