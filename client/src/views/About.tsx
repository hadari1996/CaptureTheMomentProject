import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import photologo from "../imges/photologo.png";
import Navbar from "./../components/Navbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userAPI";
import { userSelector } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import useOverFlowHidden from "../hooks/useOverFlowHidden";
function About() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  useOverFlowHidden();
  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          direction: "rtl",
          marginTop: "1vh",
          display: "flex",
          alignItems: "revert",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card sx={{ width: "50%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100%"
              image={photologo}
              alt="logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                שמי רחלי
              </Typography>
              <Typography variant="body2" color="text.secondary">
                שלום! שמי רחלי, כשהמצלמה בידיים שלי אני שוכחת עולם ומלואו,
                מתמסרת לצילום בלהט ובהתלהבות. בתוצאה האומנתית יש הרבה מהלב שלי..
                לצורך כך אני מחזיקה סטודיו מרווח ומצויד בציוד צילום מקצועי,
                רקעים, אקססוריז, ריהוט משלים לצילום, אביזרים שונים המתחדשים מעת
                לעת. לעיתים קרובות ייבחר הטבע כלוקיישן המועדף… במקרה כזה תוכלו
                לבחור בנוף של יער וירק, חוף ים, נוף אורבני, ועוד..
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                <span>צרו קשר -hahamrachel@gmail.com 050-6856491 </span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}

export default About;
