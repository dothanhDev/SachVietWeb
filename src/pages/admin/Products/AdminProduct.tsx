import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { NumberFormattingComponent } from "../../../helpers/formatvalidate";
import useDebounce from "../../../hooks/useDebounce/useDebounce";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import { Product } from "../../../submodules/models/ProductModel/Product";

const http = new HttpProductController(BaseAPi);
export default function AdminProduct() {
  const [Products, setProducts] = React.useState<Product[]>([]);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [sortWith, setSortWith] = React.useState("asc");
  const [sort, setSort] = React.useState("");

  const debounce = useDebounce(search, 400);
  React.useEffect(() => {
    fetchData(page, debounce, sortBy, sortWith);
  }, [page, debounce, sortBy, sortWith]);
  const fetchData = async (
    page: number,
    search: string = debounce || "",
    sortBy: string,
    sortWith: string
  ) => {
    try {
      const ProductData: any = await http.getAll(
        page,
        search,
        sortBy,
        sortWith
      );
      const data: any = ProductData.products;
      setPageCount(ProductData.totalPage);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // remove item
  const handleDelete = async (element: any) => {
    const destroy = await http.delete(element.id);
    toast.error("Delete item successfully", {
      position: "bottom-right",
    });

    const product = Products.filter((e) => e.id !== element.id);

    setProducts(product);
  };
  const handleChangeValue = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch((pre) => event.target.value);
    if (event.target.value) {
      setPage(1);
    }
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    if (event.target.value == "priceDown") {
      setSortBy("price_sale");
      setSortWith("desc");
      setSort(event.target.value);
    } else if (event.target.value == "priceUp") {
      setSortBy("price_sale");
      setSortWith("asc");
      setSort(event.target.value);
    }
    if (event.target.value == "old") {
      setSortBy("createdAt");
      setSortWith("desc");
      setSort(event.target.value);
    } else if (event.target.value == "new") {
      setSortBy("createdAt");
      setSortWith("asc");
      setSort(event.target.value);
    }
  };

  return (
    <Grid>
      <Grid mt={3} width={"100%"}>
        <Stack
          direction={"row"}
          mb={2}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h2"
            fontSize={"26px"}
            mb={3}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            Sản phẩm
          </Typography>
          <OutlinedInput
            sx={{
              maxWidth: "300px",
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
            placeholder="Tìm kiếm sản phẩm..."
            onChange={handleChangeValue}
          />
          <Stack sx={{ minWidth: 300 }} direction={"row"}>
            <Typography>Sắp xếp:</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={sort}
                onChange={handleChangeSort}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"old"}>Cũ nhất</MenuItem>
                <MenuItem value={"new"}>Mới nhất</MenuItem>
                <MenuItem value={"priceDown"}>Giá từ cao tới thấp</MenuItem>
                <MenuItem value={"priceUp"}>Giá từ thấp tới cao</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Link to={"/admin/createProduct"}>
            <Button variant="contained">Thêm sản phẩm</Button>
          </Link>
        </Stack>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 800,
            }}
            aria-label="simple tablek w"
          >
            <TableHead>
              <TableRow
                sx={{
                  "& > th": {
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell align="right">Tiêu đề</TableCell>
                <TableCell align="right">Số lượng sản phẩm</TableCell>
                <TableCell align="right">Danh mục</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Nhà cung cấp</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((e, i) => (
                <TableRow
                  key={e.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {e.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      style={{ objectFit: "cover" }}
                      src={e?.image}
                      width={"70px"}
                      height={"70px"}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="right">{e.title}</TableCell>
                  <TableCell align="right">{e.quantity}</TableCell>
                  <TableCell align="right">{e.category?.name}</TableCell>
                  <TableCell align="right">
                    {NumberFormattingComponent(e.price_sale)}
                  </TableCell>
                  <TableCell align="right">{e.producer?.name}</TableCell>
                  <TableCell align="right">
                    {e.status == null ? (
                      <Chip label="Hoạt động" color="success" />
                    ) : (
                      <Chip color="error" label="Ngưng hoạt động" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={"row"}
                      color={color.text_color}
                      spacing={2}
                      justifyContent={"end"}
                    >
                      <Link to={`/admin/product/${e.id}`}>
                        <EditCalendarIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      </Link>
                      <Box onClick={() => handleDelete(e)}>
                        <DeleteForeverIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack mt={2} textAlign={"center"} justifyContent={"center"}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Stack>
      </Grid>
    </Grid>
  );
}
