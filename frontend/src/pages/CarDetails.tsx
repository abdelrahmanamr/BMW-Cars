import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../api/cars.api";
import { Box, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid";
import Spinner from "../components/Spinner";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getCarById(id).then(setCar);
    }
  }, [id]);

  if (!car) return <Spinner />;

  return (
    <Box p={4}>
      <Card>
        <CardHeader
          action={
            <Button
              variant="text"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          }
          title={car.brand}
          subheader={car.carModel}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Acceleration (sec)
              </Typography>
              <Typography>{car.accelSec}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Top Speed (km/h)
              </Typography>
              <Typography>{car.topSpeed_Kmh}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Range (km)
              </Typography>
              <Typography>{car.range_Km}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Efficiency (Wh/km)
              </Typography>
              <Typography>{car.efficiency_WhKm}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Fast Charge (km/h)
              </Typography>
              <Typography>
                {car.fastCharge_KmH ? car.fastCharge_KmH : "-"}
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Rapid Charge
              </Typography>
              <Typography>{car.rapidCharge ? "Yes" : "No"}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Power Train
              </Typography>
              <Typography>{car.powerTrain}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Plug Type
              </Typography>
              <Typography>{car.plugType}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Body Style
              </Typography>
              <Typography>{car.bodyStyle}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Segment
              </Typography>
              <Typography>{car.segment}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Seats
              </Typography>
              <Typography>{car.seats}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Price (€)
              </Typography>
              <Typography>{car.priceEuro}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Release Date
              </Typography>
              <Typography>{new Date(car.date).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box mt={2} display="flex" justifyContent="center">
        <img
          src={"/car.png"}
          alt={`${car.brand} ${car.carModel}`}
          style={{
            maxHeight: 400,
            maxWidth: "100%",
            borderRadius: 8,
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default CarDetails;
