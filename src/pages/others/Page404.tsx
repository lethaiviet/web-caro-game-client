import image404 from "@assets/404.webp";
import { ErrorScreenProps, ErrorScreen } from "./components/ErrorScreen";

export default function Page404() {
  const props: ErrorScreenProps = {
    image: image404,
    error: {
      code: Number(404),
      description: "Oops Page Not Found",
      reason: "The page you are looking for does not exist or has been moved.",
    },
  };

  return <ErrorScreen {...props} />;
}
