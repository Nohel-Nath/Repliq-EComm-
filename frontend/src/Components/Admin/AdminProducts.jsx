import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { clearErrors, getAdminProduct } from "../../Actions/UserAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AdminProducts() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { error, products } = useSelector((state) => state.adminProducts);
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteUserHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/product/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        window.location.reload();
        history("/admin/products");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAdminProduct());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/updateProducts/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={
                () => deleteUserHandler(params.id) // Access the "id" directly from params.row
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.products &&
    products.products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default AdminProducts;
