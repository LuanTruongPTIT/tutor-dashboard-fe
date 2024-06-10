import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import TuneIcon from "@mui/icons-material/TuneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import Done from "@mui/icons-material/Done";
import Input from "@mui/joy/Input/Input";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { users } from "../../_components/create-schedule";

export default function EditStudents() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Guesthouse");
  const [amenities, setAmenities] = React.useState([0, 6]);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        // className="bg-background text-foreground"
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          className="bg-background text-foreground"
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Student Detail</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel
                className="text-foreground"
                sx={{ typography: "title-md", fontWeight: "bold" }}
              >
                About Family
              </FormLabel>
            </FormControl>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 1.5,
              }}
            >
              <div className="flex flex-row gap-3">
                <Typography
                  variant="subtitle"
                  fontWeight="bold"
                  fontSize={14}
                  className="text-foreground"
                >
                  Parent Name:
                </Typography>
                <Typography
                  variant="subtitle"
                  className="text-foreground"
                  fontSize={14}
                >
                  Trương Luân
                </Typography>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Typography variant="subtitle" fontWeight="bold" fontSize={14}>
                  Parent Email:
                </Typography>
                <Typography variant="subtitle" fontSize={14}>
                  student@gmail.com
                  {/* <Input placeholder="ssss" value="student@gmail.com " />/ */}
                </Typography>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Typography variant="subtitle" fontWeight="bold" fontSize={14}>
                  Parent Country:
                </Typography>
                <Typography variant="subtitle" fontSize={14}>
                  {/* <Input placeholder="ssss" value="Viet Nam" /> */}
                  Viet Nam
                </Typography>
              </div>
              <div className="flex flex-row gap-3">
                <Typography variant="subtitle" fontWeight="bold" fontSize={14}>
                  Parent Address:
                </Typography>
                <Typography variant="subtitle" fontSize={14}>
                  Street 17, No. 9, Tang Nhon Phu Ward A
                </Typography>
              </div>
              <div className="flex flex-row gap-3">
                <Typography variant="subtitle" fontWeight="bold" fontSize={14}>
                  Parent Phone:
                </Typography>
                <Typography variant="subtitle" fontSize={14}>
                  0335219807
                </Typography>
              </div>
            </Box>

            <Typography level="title-md" fontWeight="bold" sx={{ mt: 1 }}>
              Complete Profile
            </Typography>
            <div role="group" aria-labelledby="rank">
              <List
                orientation="horizontal"
                size="sm"
                sx={{
                  "--List-gap": "12px",
                  "--ListItem-radius": "20px",
                }}
              >
                <Progress
                  size="md"
                  radius="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium",
                    value: "text-foreground/60",
                  }}
                  label="65%"
                  value={65}
                  showValueLabel={true}
                />
              </List>
            </div>
          </DialogContent>

          <Divider sx={{ mt: "auto" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            useFlexGap
            spacing={1}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setType("");
                setAmenities([]);
              }}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Show 165 properties</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
