import image500 from "@assets/500.webp";
import { ErrorScreenProps, ErrorScreen } from "./components/ErrorScreen";

export default function Page500() {
  const props: ErrorScreenProps = {
    image: image500,
    error: {
      code: Number(500),
      description: "Internal Server Error",
      reason: "Something goes wrong with our servers, please try again later.",
    },
  };

  return <ErrorScreen {...props} />;
}
