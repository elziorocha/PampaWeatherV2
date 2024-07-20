import AirPollution from "./Components/AirPollution/AirPollution";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Footer from "./Components/Footer/Footer";
import Humidity from "./Components/Humidity/Humidity";
import Mapbox from "./Components/Mapbox/Mapbox";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Pressure from "./Components/Pressure/Pressure";
import States from "./Components/States/States";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import UvIndex from "./Components/UvIndex/UvIndex";
import Visibility from "./Components/Visibility/Visibility";
import Wind from "./Components/Wind/Wind";


export default function Home() {
  return (
    <main className="m-auto mx-4 lg:mx-8 xl:mx-24 2xl:mx-64">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-72 flex-col gap-4 md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex w-full flex-col">
          <div className="sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <FeelsLike />
            <Sunset />
            <AirPollution />
            <DailyForecast />
            <Wind />
            <UvIndex />
            <Population />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="flex flex-1 flex-col items-center gap-3">
              <States />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
