import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Box, Typography } from "@mui/material";

const TotalProducts: React.FC = () => {
  const total = useSelector((state: RootState) => state.product.total);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">סה"כ: {total} מוצרים</Typography>
    </Box>
  );
};

export default TotalProducts;
