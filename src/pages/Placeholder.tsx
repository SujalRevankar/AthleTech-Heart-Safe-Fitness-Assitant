import { Layout } from "@/components/layout/Layout";
import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description?: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground text-center max-w-md">
          {description || "This feature will be implemented in the next phase."}
        </p>
      </div>
    </Layout>
  );
};

export default Placeholder;
