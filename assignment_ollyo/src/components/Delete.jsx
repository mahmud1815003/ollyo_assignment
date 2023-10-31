import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, setShow } from "../redux/globalSlice";

const DeleteText = () => {
  const theme = useTheme();
  const counter = useSelector((state) => state.global.counter);
  const showAll = useSelector((state) => state.global.showAll);
  const dispatch = useDispatch();
  return (
    <Box width={'100%'}>
      <Box
        sx={{
          display: "none",
          [theme.breakpoints.down("md")]: {
            display: "block",
          },
        }}
      >
        {!showAll && (
          <Button
            variant="outlined"
            color="warning"
            onClick={() => dispatch(setShow())}
          >
            Select Photos
          </Button>
        )}
        {showAll && (
          <Button
            variant="outlined"
            color="warning"
            onClick={() => dispatch(setShow())}
          >
            Exit
          </Button>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {counter !== 0 && (
          <Typography variant="h5">Selected: {counter}</Typography>
        )}
        {counter !== 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(deleteSelected())}
          >
            Delete Selected
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DeleteText;
