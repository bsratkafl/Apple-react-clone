import Alert from "../Alert/Alert";
import SectionOne from "../Firstone/SectionOne";
import SectionTwo from "../Second/SectionTwo";
import SectionThird from "../third/SectionThird";
import SectionFourth from "../Fourth/SectionFourth";
import SectionFifth from "../Fifth/SectionFifth";
import SectionSixth from "../Sixth/SectionSixth";
import YoutubeVideos from "../YoutubeVideos/YoutubeVideos";

function Main() {
  return (
    <>
      <Alert />
      <SectionOne />
      <SectionTwo />
      <SectionThird />
      <SectionFourth />
      <SectionFifth />
      <SectionSixth />
      {/* question 1 - api integration - youtubeapi */}
      <YoutubeVideos />
    </>
  );
}

export default Main;
