import { Box } from "native-base";
import Text from "../base/Text";

interface PublicPostsPreviewProps {
  title: string;
}

export default function PublicPostPreview({ title }: PublicPostsPreviewProps) {
  return (
    <Box className="rounded-lg px-1.5 py-3 bg-stone-600">
      <Text>{title}</Text>
    </Box>
  );
}
