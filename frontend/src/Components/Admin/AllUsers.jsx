import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../Actions/UserAction";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AllUsers() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { error, users } = useSelector((state) => state.allUser);
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteUserHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/user/delete/${id}`,
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
        history("/admin/users");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.6 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.7,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
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

  const rows = users
    ? users.map((item) => ({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      }))
    : [];

  return (
    <Fragment>
      <div className="dashboard grid grid-cols-12 gap-6">
        <style>
          {`
            .MuiDataGrid-overlay {
              display: none !important;
            }
          `}
        </style>
        <Sidebar />
        <div className="productListContainer col-span">
          <h1 className="text-3xl font-bold mb-4">ALL USERS</h1>

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

export default AllUsers;
