import { Button, MenuItem, TextField, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, saveProducts } from "../store/productSlice";
import { AppDispatch, RootState } from "../store";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormValues {
  name: string;
  category: string;
}

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((response: { data: { name: string }[] }) =>
        setCategories(response.data.map((cat: { name: string }) => cat.name)),
      )
      .catch((error: any) =>
        console.error("Failed to fetch categories", error),
      );
  }, []);

  const onSubmit: SubmitHandler<FormValues> = ({ name, category }) => {
    const newProduct = { name, category, quantity: 1 };
    dispatch(addProduct(newProduct));
    reset();
  };

  const handleSave = () => {
    if (products.length === 0) {
      toast.error("אין מוצרים בסל הקניות!");
      return;
    }

    dispatch(saveProducts(products))
      .then(() => {
        toast.success("ההזמנה נסגרה ונשמרה במערכת!");
        reset();
      })
      .catch(() => toast.error("בעייה בעת ביצוע ההזמנה"));
  };

  return (
    <div>
      <ToastContainer />
      <Box sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <TextField
                label="מוצר"
                {...register("name", { required: "הזן שם מוצר" })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>
            <Grid item>
              <TextField
                select
                label="קטגוריה"
                {...register("category", {
                  required: "קטגורייה הינו שדה חובה",
                })}
                error={!!errors.category}
                helperText={errors.category ? errors.category.message : ""}
                style={{ minWidth: 200 }}
                defaultValue={""}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option} autoFocus={true}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid display={"flex"} justifyContent={"center"} gap={5} padding={4} >
          <Grid item>
              <Button variant="contained" type="submit">
                הוסף
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="contained"
                disabled={!products.length}
                onClick={handleSave}
              >
                סיים הזמנה
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default AddProduct;
