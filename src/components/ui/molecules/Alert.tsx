import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/atom/alert";
export function AlertDemo({ error }: { error: string }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
