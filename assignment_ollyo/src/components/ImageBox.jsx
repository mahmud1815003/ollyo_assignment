import { Box, Checkbox, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { clearSelected, setSelected } from "../redux/globalSlice";

const ImageBox = ({ link, index }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(state => state.global.selected);
  const showAll = useSelector(state => state.global.showAll);
  const checked = selected.indexOf(link);
  const {
    attributes,
    transform,
    transition,
    setNodeRef,
    listeners,
  } = useSortable({ id: link });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      component={"div"}
      {...attributes}
      style={style}
      {...listeners}
      ref={setNodeRef}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        borderColor: theme.palette.text.alt,
        position: "relative",
        border: 3,
        gridColumn: index == 0 ? "span 4" : "span 2",
        gridRow: index == 0 ? "span 2" : "span 1",
        [theme.breakpoints.down("md")]: {
          gridColumn: index == 0 ? "span 4" : "span 2",
          gridRow: index == 0 ? "span 2" : "span 1",
        },
        [theme.breakpoints.down("sm")]: {
          gridColumn: index == 0 ? "span 4" : "span 2",
          gridRow: index == 0 ? "span 2" : "span 1",
        },
      }}
    >
      <Box
        component={"img"}
        src={`${link}`}
        loading="lazy"
        width={"100%"}
        height={"100%"}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {(hover || checked !== -1 || showAll) && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor:
              theme.palette.mode == "dark"
                ? "rgba(255,255,255,0.4)"
                : "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Checkbox
            checked={checked == -1 ? false : true}
            color="success"
            onChange={(e) => {
              if(checked !== -1){
                dispatch(clearSelected(link));
              }else{
                dispatch(setSelected(link));
              }
            }}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "&.Mui-checked": {
                color: "black",
              },
              color: "black",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageBox;
