import { useMemo, useState } from "react";
import data from "./data";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Nav from "./components/Nav";
import { useDispatch, useSelector } from "react-redux";
import ImageBox from "./components/ImageBox";
import { changeIndex } from "./redux/globalSlice";
import { Delete } from "@mui/icons-material";
import DeleteText from "./components/Delete";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const dispatch = useDispatch();
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: mode },
        typography: { fontFamily: ["Source Sans Pro", "sans-serif"].join(",") },
      }),
    [mode]
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  const images = useSelector((state) => state.global.data);
  const handleDrag = (e) => {
    const {over,active} = e;
    if(over.id !== active.id){
      const activeIndex = images.indexOf(active.id);
      const overIndex = images.indexOf(over.id);
      dispatch(changeIndex({
        a: activeIndex,
        b: overIndex,
      }));
    }
  };
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDrag}>
          <Box maxWidth={"1500px"} mx={"auto"} px={'10px'} pb={'20px'}>
            <Nav />
            <Divider sx={{backgroundColor: theme.palette.text.secondary, mb: 2, borderBottomWidth: 2}} />
            <DeleteText />
            <Box
              display={"grid"}
              gap={"10px"}
              sx={{
                gridTemplateColumns: "repeat(10,1fr)",
                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: "repeat(8,1fr)",
                },
                [theme.breakpoints.down('sm')]: {
                  gridTemplateColumns: "repeat(4,1fr)",
                }
              }}
            >
              <SortableContext items={images}>
                {images?.map((url, index) => {
                  return <ImageBox key={index} link={url} index={index} />
                })}
              </SortableContext>
            </Box>
          </Box>
        </DndContext>
      </ThemeProvider>
    </div>
  );
}

export default App;
